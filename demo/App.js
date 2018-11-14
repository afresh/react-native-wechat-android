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
    componentWillMount() {
        WeChat.registerApp('appid');
    };

    //发送授权请求（微信登录）
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

    //发送好友消息（小程序消息demo）
    _shareToSession = () => {
        //判断微信是否安装
        WeChat.isWXAppInstalled()
            .then((isInstalled) => {
                if (isInstalled) {
                    let imageResource = require('./icon64_wx_logo.png'); //小程序消息封面图片，小于128k
                    //发送好友消息
                    WeChat.shareToSession({
                        type: 'miniProgram',
                        webpageUrl: "http://www.qq.com", //兼容低版本的网页链接
                        userName: "gh_xxx", //小程序原始id
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

    //拉起小程序
    _launchMini = () => {
        WeChat.isWXAppInstalled()
            .then((isInstalled) => {
                if (isInstalled) {
                    WeChat.launchMini({
                        userName: "gh_xxx", //小程序原始id
                        miniProgramType: __DEV__ ? 2 : 0, //拉起小程序的类型，0-正式版，1-开发版，2-体验版
                        path: "/pages/index", //拉起小程序页面的可带参路径，不填默认拉起小程序首页
                    })
                        .then(result => {
                            console.log('成功拉起小程序', result);
                        })
                        .catch(err => {
                            console.log('拉起小程序发生错误：', err.message);
                        });
                } else {
                    console.log('没有安装微信，请先安装微信客户端在进行登录');
                }
            });
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
                {/* 拉起小程序 */}
                <TouchableOpacity onPress={() => {this._launchMini()}}>
                    <Text style={styles.instructions}>
                        To Launch Mini
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
