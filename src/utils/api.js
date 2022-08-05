import axios from "axios";

const service = axios.create({
  baseURL:
    "https://www.fastmock.site/mock/662202f87e4d4a3f6476554f446747aa/_pj",
  timeout: 1500,
});

/**
 * 登录
 * {
 *    *uid:""
 *    *password:""
 * }
 */
export function Login(data) {
  return service.request({
    method: "post",
    url: "/api/login",
    data,
  });
}

/**
 * 评奖评优数据
 * {
 *    *uuid: 学号
 *    *uid: 学号(文档就这么写的，我也不知道)
 *    *studentname: 学生姓名
 * }
 */
export function AwardJudge(data) {
  return service.request({
    method: "get",
    url: "/api/data",
    data,
    // 原计划采用header携带当前token的认证方式，现暂弃用
    // headers: {
    //   uuid: localStorage.username,
    // },
  });
}
