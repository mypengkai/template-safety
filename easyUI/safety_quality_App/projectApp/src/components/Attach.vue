<template>
  <div class="att_main">
    <div class="att_num_tip">
      <span style="margin-left: 5px;text-align: left;">上传附件:</span>
      <span
        style="text-align: right;float: right;margin-right: 5px;"
      >{{selectedMediaNum}}/{{mediaLength}}</span>
    </div>
    <div class="att_con">
      <div class="att_item" v-for="(item, index) in attachList" :key="index">
        <yd-lightbox>
          <yd-lightbox-img v-if="convertFile(item[filePath])" class="att_img" :src="item[filePath]"></yd-lightbox-img>
        </yd-lightbox>
        <video
          v-if="!convertFile(item[filePath])"
          class="att_img"
          :src="item[filePath]"
          @click="previewVideo(index)"
        ></video>
        <img
          v-if="!convertFile(item[filePath])"
          class="att_play"
          src="@/assets/img/pub/play.png"
          @click="previewVideo(index)"
        />
        <img v-if="!readonly" class="att_del" @click="delImg(index)" src="@/assets/img/pub/del.png" />
      </div>

      <div class="att_item" v-show="attachList.length < mediaLength && !readonly" @click="add">
        <img class="att_img" src="@/assets/img/pub/tianjia.png" />
      </div>
    </div>
    <template v-if="sourceType===1">
      <yd-actionsheet :items="myItems" v-model="showAction" cancel="取消"></yd-actionsheet>
    </template>
    <template v-else-if="sourceType===2">
      <yd-actionsheet :items="myItemsOnlyPhoto" v-model="showAction" cancel="取消"></yd-actionsheet>
    </template>
    <template v-else-if="sourceType===3">
      <yd-actionsheet :items="myItemsOnlyImage" v-model="showAction" cancel="取消"></yd-actionsheet>
    </template>
    <template v-else-if="sourceType===4">
      <yd-actionsheet :items="myItemsOnlyVideo" v-model="showAction" cancel="取消"></yd-actionsheet>
    </template>

    <yd-popup v-model="showVideo" position="center" width="90%">
      <div class="att_video">
        <div>
          <video id="previewVideo" :src="videoSrc" autoplay controls></video>
        </div>
      </div>
      <div class="att_close">
        <yd-button @click.native="showVideo = false">关闭</yd-button>
      </div>
    </yd-popup>
  </div>
</template>

<script>
import { openCamera } from "@/assets/plus/camera";
export default {
  data() {
    return {
      showAction: false,
      myItems: [
        {
          label: "拍照",
          callback: () => {
            this.takePhoto();
          }
        },
        {
          label: "从相册选择",
          callback: () => {
            this.selectAlbum();
          }
        },
        {
          label: "录像",
          callback: () => {
            this.takeVideo();
          }
        }
      ],
      myItemsOnlyPhoto: [
        {
          label: "拍照",
          callback: () => {
            this.takePhoto();
          }
        }
      ],
      myItemsOnlyImage: [
        {
          label: "拍照",
          callback: () => {
            this.takePhoto();
          }
        },
        {
          label: "从相册选择",
          callback: () => {
            this.selectAlbum();
          }
        }
      ],
      myItemsOnlyVideo: [
        {
          label: "录像",
          callback: () => {
            this.takeVideo();
          }
        }
      ],
      showVideo: false,
      videoSrc: "",
      selectedMediaNum: 0
    };
  },
  props: {
    attachList: {
      type: Array
    },
    delAttachList: {
      type: Array
    },
    readonly: {
      type: Boolean
    },
    file: {
      type: String,
      default: "file"
    },
    filePath: {
      type: String,
      default: "filePath"
    },
    sourceType: {
      type: Number,
      default: 1
    },
    mediaLength: {
      type: Number,
      default: 9
    }
  },
  created() {},
  methods: {
    convertFile(path) {
      let suffix = path.substr(path.lastIndexOf("."));
      let url = "";
      if (
        suffix == ".mov" ||
        suffix == ".3gp" ||
        suffix == ".mp4" ||
        suffix == ".avi"
      ) {
        return false;
      } else {
        return true;
      }
    },
    previewVideo(index) {
      this.videoSrc = this.attachList[index][this.filePath];
      this.showVideo = true;
    },
    delImg(index) {
      if (this.attachList[index].id) {
        this.delAttachList.push(this.attachList[index].id);
      }
      this.selectedMediaNum--;
      this.attachList.splice(index, 1);
    },
    add() {
      this.showAction = true;
    },
    takePhoto() {
      openCamera(
        "img",
        this.mediaLength - this.selectedMediaNum,
        (state, file, path) => {
          if (state == "1") {
            let newFile = {};
            newFile[this.file] = file;
            newFile[this.filePath] = path;
            newFile["isNew"] = true;
            if (this.selectedMediaNum > this.mediaLength) {
              plus.nativeUI.toast("多媒体资源超出" + this.mediaLength);
            } else {
              this.selectedMediaNum++;
            }
            this.attachList.push(newFile);
          }
        }
      );
    },
    takeVideo() {
      openCamera(
        "video",
        this.mediaLength - this.selectedMediaNum,
        (state, file, path) => {
          if (state == "1") {
            let newFile = {};
            newFile[this.file] = file;
            newFile[this.filePath] = path;
            newFile["isNew"] = true;
            if (this.selectedMediaNum > this.mediaLength) {
              plus.nativeUI.toast("多媒体资源超出" + this.mediaLength);
            } else {
              this.selectedMediaNum++;
            }
            this.attachList.push(newFile);
          }
        }
      );
    },
    selectAlbum() {
      openCamera(
        "selectImg",
        this.mediaLength - this.selectedMediaNum,
        (state, file, path) => {
          if (state == "1") {
            let newFile = {};
            newFile[this.file] = file;
            newFile[this.filePath] = path;
            newFile["isNew"] = true;
            if (this.selectedMediaNum > this.mediaLength) {
              plus.nativeUI.toast("多媒体资源超出" + this.mediaLength);
            } else {
              this.selectedMediaNum++;
            }
            this.attachList.push(newFile);
          }
        }
      );
    }
  }
};
</script>

<style lang="less" scoped>
.att_main {
  background-color: #fff;
}
.att_con {
  overflow: hidden;
  //padding-top: 15px;
}
.att_num_tip {
  line-height: 18px;
  font-size: 14px;
  width: 100%;
  color: #555555;
  padding: 0 0.2rem;
}
.att_item {
  width: 25%;
  float: left;
  text-align: center;
  position: relative;
  margin: 0 8px 15px 8px;
  //margin: 0 8px ;
  border-radius: 5px;
}
.att_img {
  width: 65px;
  height: 65px;
  margin: 0 auto;
}
.att_del {
  width: 20px;
  position: absolute;
  top: -8px;
  right: 50%;
  margin-right: -40px;
  background-color: #fff;
  border-radius: 20px;
}
.att_play {
  position: absolute;
  top: 50%;
  left: 50%;
  height: 20px;
  margin-top: -10px;
  margin-left: -10px;
  background-color: #eee;
  border-radius: 20px;
}
.att_video {
  position: relative;
}
.att_video:before {
  content: "";
  display: inline-block;
  padding-bottom: 110%;
  vertical-align: middle;
}
.att_video div {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  overflow: hidden;
}
.att_video video {
  margin: 0 auto;
  max-width: 100%;
  max-height: 100%;
}
.att_close {
  text-align: center;
  margin: 10px 0;
}
/deep/ .yd-slider-wrapper {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  height: 100%;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  position: relative;
  z-index: 999;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-transition-property: -webkit-transform;
  transition-property: -webkit-transform;
  transition-property: transform;
  transition-property: transform, -webkit-transform;
}
</style>
