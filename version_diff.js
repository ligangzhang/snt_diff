let s1 = "That's a good phenomenan, for English is essential nowadays";
let s2 = "That 's a good phenomenan, for English is essential nowadays";

let ret = diff(s1, s2)
console.log(ret)

function diff(s1,s2){
  let arr1 = s1.split(' ')
  let arr2 = s2.split(' ')

  let tmpArr1 = [];
  let tmpArr2 = [];

  for (let i = 0; i < arr1.length + 1; i++) {
    for (let j = 0; j < arr2.length + 1; j++) {
      if(tmpArr1[i] === undefined){
        tmpArr1[i] = []
      }
      if(tmpArr2[i] === undefined){
        tmpArr2[i] = []
      }
      tmpArr1[i][j] = 0;
      tmpArr2[i][j] = 0;
    }
  }

  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      // 从对角过来
      if (arr1[i] == arr2[j]) {
        tmpArr1[i + 1][j + 1] = tmpArr1[i][j] + 1;
        tmpArr2[i][j] = 0;
      } else {
        if (tmpArr1[i][j + 1] > tmpArr1[i + 1][j]) {
          // 从上面过来，从arr1获取，删除
          tmpArr1[i + 1][j + 1] = tmpArr1[i][j + 1];
          tmpArr2[i][j] = 1;
        } else {
          // 从前面过来,从arr2获取，新增
          tmpArr1[i + 1][j + 1] = tmpArr1[i + 1][j];
          tmpArr2[i][j] = -1;
        }
      }
    }
  }
    
  let max_length = tmpArr1[arr1.length-1][arr2.length-1];
  let i = arr1.length - 1;
  let j = arr2.length - 1;
  res = [];

  while (max_length >= 0 && j >= 0) {
    if (tmpArr2[i][j] == 0) {
      res.push(arr2[j]);
      j -= 1;
      i -= 1;
      max_length -= 1;
    } else if (tmpArr2[i][j] == -1) {
      res.push("<span style='color:red;'>"+arr2[j]+"</span>");
      //res.push(arr2[j] + "_add");
      j -= 1;
    } else if (tmpArr2[i][j] == 1) {
      //res.push( arr1[i] + "_delete");
      i -= 1;
    }
  }
  while (i >= 0) {
    //res.push(arr1[i] + "_delete");
    i -= 1;
  }
  while (j >= 0) {
    res.push("<span style='color:red;'>"+arr2[j]+"</span>");
    //res.push(arr2[j] + "_add");
    j -= 1;
  }

  let ret = res.reverse().join( ' ')
  return ret
}
