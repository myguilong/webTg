export default function getPosition() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          let latitude = position.coords.latitude
          let longitude = position.coords.longitude
          let data = {
            latitude: latitude,
            longitude: longitude
          }
          resolve(data)
        }, function () {
          reject(arguments)
        })
      } else {
        reject('你的浏览器不支持当前地理位置信息获取')
      }
    })
  }
