const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  name: state => state.user.name,
  roles: state => state.user.roles,
  permissions: state => state.user.permissions
}
export default getters
