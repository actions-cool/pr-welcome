function checkPermission(require, permission) {
  /**
   * 有权限返回 true
   */
  const permissions = ['none', 'read', 'write', 'admin'];
  const requireNo = permissions.indexOf(require);
  const permissionNo = permissions.indexOf(permission);

  return requireNo <= permissionNo;
}

// **********************************************************
module.exports = {
  checkPermission,
};
