import {constantRouterMap } from '@/router'
import Layout from '../../views/layout/Layout'
import {queryCurUserMenuNode} from '@/api/system/menu'
import {getToken} from '@/utils/auth'


/**
* 动态生成前端新的路由
*/
function generateRoutesFromMenu (menu) {
  let routes = []
  for (let i = 0, l = menu.length; i < l; i++) {
    let item = menu[i]
    let commVue
    if(item.children && item.children.length > 0){
      item.component = Layout
      generateRoutesFromMenu(item.children, routes)
    }else{
      commVue =  '../../views' + item.path + '/index'
      item.component = () => import('../../views' + item.path + '/index');
    }
    routes.push(item)
  }
  return routes
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
         let menu
         if(getToken()){
            queryCurUserMenuNode().then(response => {
            let accessedRouters  = generateRoutesFromMenu(response.datas)
            commit('SET_ROUTERS', accessedRouters)
            resolve()
           }) 
         }
      })
    }
  }
}

export default permission
