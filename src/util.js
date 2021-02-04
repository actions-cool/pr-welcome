function checkPermission(require, permission) {
  /**
   * 有权限返回 true
   */
  const permissions = ['read', 'write', 'admin'];
  const requireNo = permissions.indexOf(require);
  const permissionNo = permissions.indexOf(permission);

  return requireNo <= permissionNo;
}

function dealStringToArr(para) {
  /**
   * in  'x1,x2,x3'
   * out ['x1','x2','x3']
   */
  let arr = [];
  if (para) {
    const paraArr = para.split(',');
    paraArr.forEach(it => {
      if (it.trim()) {
        arr.push(it.trim());
      }
    });
  }
  return arr;
}

// **********************************************************
module.exports = {
  checkPermission,
  dealStringToArr,
};
