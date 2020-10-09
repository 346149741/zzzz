import ConsequenceAPI from '@/api/base/consequence'
const provinceList = ConsequenceAPI.getCity();

export const getNativePlace = (arr) => {
  if(!Array.isArray(arr)){
    arr = JSON.parse(arr)
  }
  let l = arr.length
  let str = ''
  let a = 0;
  if(arr!=''||l>0){
    loopfun(arr[a],provinceList)
  }
  function loopfun(item,looparr){
    if(a<=l){
      for(let i = 0; i < looparr.length; i++){
        if(item == looparr[i].code){
          str += looparr[i].name
          a++
          if(looparr[i].city){
            loopfun(arr[a],looparr[i].city)
          }
        }
      }
    }
  }
  return str
}