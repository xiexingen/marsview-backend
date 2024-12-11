const adminService = require('../service/admin');
const projectService = require('../service/projects.service');
const userService = require('../service/project.user.service');
const roleService = require('../service/roles.service');
const util = require('../utils/util');

// 项目配置
async function getProjectConfig(ctx) {
  const { projectId } = ctx.request.query;

  if (!projectId) {
    return ctx.throw(400, '项目ID不能为空');
  }
  const info = await adminService.getProjectConfig(projectId);
  util.success(ctx, info?.[0] || {});
}

// 页面详情
async function getPageDetail(ctx) {
  const { id, env } = ctx.request.params;
  if (!util.isNotEmpty(id) || !util.isNumber(id)) {
    return ctx.throw(400, '页面ID不能为空');
  }
  if (!util.checkEnv(env)) {
    return ctx.throw(400, '环境参数不能为空');
  }

  let [result] = await adminService.getPageDetailById(id);
  if (result) {
    const lastPublishId = result[`${env}PublishId`];
    if (lastPublishId > 0) {
      const pageId = result.id;
      [result] = await adminService.getLastPublishInfo(pageId, lastPublishId);
      util.success(ctx, result);
    } else {
      util.fail(ctx, '当前页面未发布', 500);
    }
  } else {
    util.fail(ctx, '当前页面不存在', 404);
  }
}

async function getProjectList(ctx) {
  const { pageNum, pageSize } = ctx.request.query;
  const { userId } = util.decodeToken(ctx);
  const { total } = await projectService.ownListCount(userId);
  if (total === 0) {
    util.success(ctx, {
      list: [],
      total: 0,
      pageSize: +pageSize,
      pageNum: +pageNum,
    });
  }
  const list = await projectService.ownList(pageNum || 1, pageSize || 12, userId);
  util.success(ctx, {
    list,
    total,
    pageSize: +pageSize,
    pageNum: +pageNum,
  });
}

// 菜单列表
async function getMenuList(ctx) {
  const { id } = ctx.request.params;

  if (!util.isNumber(id)) {
    return ctx.throw(400, '项目ID不能为空');
  }

  const { userId } = util.decodeToken(ctx);

  const project = await projectService.getProjectInfoById(id);
  // 判断项目是否存在
  if (project.length > 0) {
    // 判断项目是否公开
    if (project[0].isPublic === 1) {
      const menuList = await adminService.getAllMenuList(id);
      util.success(ctx, { list: menuList });
    } else {
      // 创建用户相当于系统超级管理员
      if (project[0].userId === userId) {
        const menuList = await adminService.getAllMenuList(id);
        util.success(ctx, { list: menuList });
      } else {
        const user = await userService.getUserRole(userId, id);
        if (!user) {
          return util.fail(ctx, '您当前暂无访问权限', '10001');
        }
        // 管理员返回全部菜单
        if (user.systemRole === 1) {
          const menuList = await adminService.getAllMenuList(id);
          util.success(ctx, { list: menuList });
        } else {
          // 根据用户角色查询对应菜单列表
          const { id, checked = '', halfChecked = '' } = await roleService.getRoleInfo(user.roleId);
          let menuIds = [];
          if (checked) {
            menuIds = menuIds.concat(checked.split(','));
          }
          if (halfChecked) {
            menuIds = menuIds.concat(halfChecked.split(','));
          }
          if (menuIds.length === 0) {
            util.success(ctx, { list: [] });
          } else {
            const menuList = await adminService.getMenuList(menuIds.join(', '), id);
            util.success(ctx, { list: menuList });
          }
        }
      }
    }
  } else {
    util.success(ctx, { list: [] });
  }
}
module.exports = {
  getProjectConfig,
  getPageDetail,
  getProjectList,
  getMenuList,
};
