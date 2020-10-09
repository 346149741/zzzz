import axios from 'axios'

export async function getAdressAMap(location) {
  var adress = ''
  if (!(location instanceof Array) || location.length < 2) {
    return adress
  }
  const url = 'https://restapi.amap.com/v3/geocode/regeo?output=JSON&location=' + location[0] + ',' + location[1] + '&key=4b5cf6003499b80c025d0b67e6314072'
  const { data: res } = await axios.get(url)
  adress = res.regeocode.formatted_address
  return adress
}
