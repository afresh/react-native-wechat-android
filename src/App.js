/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import * as WeChat from './wechat';
let resolveAssetSource = require('resolveAssetSource');

export default class App extends Component {
  componentDidMount() {
    // WeChat.registerApp('appid');
  };

  _sendAuthRequest = () => {
    let scope = 'snsapi_userinfo';
    let state = 'wechat_sdk_demo';
    //判断微信是否安装
    WeChat.isWXAppInstalled()
      .then((isInstalled) => {
        if (isInstalled) {
          //发送授权请求
          WeChat.sendAuthRequest(scope, state)
            .then(responseCode => {
              //todo: 返回code码，通过code获取access_token
              // this.getAccessToken(responseCode.code);
            })
            .catch(err => {
              console.log('登录授权发生错误：', err.message);
            })
        } else {
          console.log('没有安装微信，请先安装微信客户端在进行登录');
        }
      })
  };

  _shareToSession = () => {
    //判断微信是否安装
    WeChat.isWXAppInstalled()
      .then((isInstalled) => {
        if (isInstalled) {
          //发送授权请求
          let imageResource = require('./icon64_wx_logo.png'); //小程序消息封面图片，小于128k
          WeChat.shareToSession({
            type: 'miniProgram',
            webpageUrl: "http://www.qq.com", //兼容低版本的网页链接
            userName: "gh_d43f693ca31f", //小程序原始id
            path: "/pages/media", //小程序页面路径
            title: '微信小程序消息', //小程序消息title
            description: '发送微信小程序消息给好友', //小程序消息desc
            mediaTagName: '小程序消息',
            messageAction: undefined,
            messageExt: undefined,
            imageUrl: resolveAssetSource(imageResource).uri //小程序消息封面图片，小于128k
          })
          .then(result => {
            console.log('成功发送微信小程序消息给好友', result);
          })
          .catch(err => {
            console.log('发送微信小程序消息发生错误：', err.message);
          })
        } else {
          console.log('没有安装微信，请先安装微信客户端在进行登录');
        }
      })
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to WeChat for Android!
        </Text>
        {/* 微信登录demo */}
        <TouchableOpacity onPress={() => {this._sendAuthRequest()}}>
          <Text style={styles.instructions}>
            To Login
          </Text>
        </TouchableOpacity>
        {/* 发送小程序消息到好友 */}
        <TouchableOpacity onPress={() => {this._shareToSession()}}>
          <Text style={styles.instructions}>
            To Share Mini
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
