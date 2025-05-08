import { createRouter, createWebHistory } from 'vue-router'
import login from '@/views/Login/index'
import adminLayout from '@/layout/adminLayout/index'
import notesLayout from '@/layout//notesLayout/index'
import blogLayout from '@/layout/blogLayout/index'
// 公有路由
export const publicRoutes = [
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/notes',
    name: 'notes',
    component: notesLayout,
    children: [
      {
        path: '/notes',
        name: 'notes',
        component: () => import('@/views/NotesPage/Notes/index')
      }
    ]
  },
  {
    path: '/project',
    name: 'project',
    component: () => import('@/views/ProjectPage/index')
  },
  {
    path: '/blog',
    name: 'blog',
    component: blogLayout,
    children: [
      {
        path: '/blog',
        name: 'blog',
        component: () => import('@/views/BlogPage/Blog')
      },
      {
        // 博客内容
        path: '/blogcontent',
        name: 'content',
        component: () => import('@/views/BlogPage/Blogcontent')
      }
    ]
  },
  {
    path: '/',
    redirect: '/nmanage',
    component: adminLayout,
    children: [
      {
        path: '/accountManage',
        name: 'accountManage',
        component: () => import('@/views/AccountPage/AccountManage'),
        meta: {
          title: 'accountManage',
          icon: 'accountManage'
        }
      },
      {
        path: '/nmanage',
        name: 'nmanage',
        redirect: '/nmanage/baseinfo',
        meta: {
          title: 'notesite',
          icon: 'notes'
        },
        children: [
          {
            path: '/nmanage/baseinfo',
            name: 'baseinfo',
            component: () => import('@/views/NotesPage/NotesiteInfo/index'),
            meta: {
              title: 'baseinfo',
              icon: 'notesBase'
            }
          },
          {
            path: '/nmanage/manageNote',
            name: 'manageNote',
            component: () => import('@/views/NotesPage/NoteManage/index'),
            meta: {
              title: 'manageNote',
              icon: 'viewNotes'
            }
          },
          {
            path: '/nmanage/manageNoteTitle',
            name: 'manageNoteTitle',
            component: () => import('@/views/NotesPage/NoteTitleManage/index'),
            meta: {
              title: 'manageNoteTitle',
              icon: 'notesTitle'
            }
          },
          {
            path: '/nmanage/manageNotesBanner',
            name: 'manageNotesBanner',
            component: () =>
              import('@/views/NotesPage/NotesBannerManage/index'),
            meta: {
              title: 'manageNotesBanner',
              icon: 'banner'
            }
          },
          {
            path: '/nmanage/createNote',
            name: 'createNote',
            component: () => import('@/views/NotesPage/NoteCreate/index'),
            meta: {
              title: 'createNote',
              icon: 'createNotes'
            }
          }
        ]
      },
      {
        path: '/resume',
        name: 'resume',
        redirect: '/resume/baseinfo',
        meta: {
          title: 'resume',
          icon: 'resumeManage'
        },
        children: [
          {
            path: '/resume/baseinfo',
            name: 'resumebaseinfo',
            component: () => import('@/views/ResumePage/Resumebaseinfo/index'),
            meta: {
              title: 'resumebaseinfo',
              icon: 'notesBase'
            }
          },
          {
            path: '/resume/educational',
            name: 'resumeeducational',
            component: () =>
              import('@/views/ResumePage/ResumeEducational/index'),
            meta: {
              title: 'resumeeducational',
              icon: 'educational'
            }
          },
          {
            path: '/resume/skill',
            name: 'resumeskill',
            component: () => import('@/views/ResumePage/Resumeskill/index'),
            meta: {
              title: 'resumeskill',
              icon: 'skill'
            }
          },
          {
            path: '/resume/work',
            name: 'resumework',
            component: () => import('@/views/ResumePage/ResumeWork/index'),
            meta: {
              title: 'resumework',
              icon: 'work'
            }
          },
          {
            path: '/resume/project',
            name: 'resumeproject',
            component: () => import('@/views/ResumePage/Resumeproject/index'),
            meta: {
              title: 'resumeproject',
              icon: 'project'
            }
          }
        ]
      },
      {
        path: '/bmanage',
        name: 'bmanage',
        redirect: '/bmanage/baseinfo',
        meta: {
          title: 'bmanage',
          icon: 'blog'
        },
        children: [
          {
            path: '/bmanage/baseinfo',
            name: 'bmanagebaseinfo',
            component: () => import('@/views/BlogPage/Blogbaseinfo/index'),
            meta: {
              title: 'blogbaseinfo',
              icon: 'blogBase'
            }
          },
          {
            path: '/bmanage/manageBlog',
            name: 'manageBlog',
            component: () => import('@/views/BlogPage/BlogManage/index'),
            meta: {
              title: 'viewblog',
              icon: 'viewblog'
            }
          },
          {
            path: '/bmanage/createBlog',
            name: 'createBlog',
            component: () => import('@/views/BlogPage/BlogCreate/index'),
            meta: {
              title: 'createBlog',
              icon: 'createNotes'
            }
          },
          {
            path: '/bmanage/commentManage',
            name: 'commentManage',
            component: () => import('@/views/BlogPage/BlogCommentManage'),
            meta: {
              title: 'commentManage',
              icon: 'commentManage'
            }
          }
        ]
      },
      {
        path: '/tools',
        name: 'tools',
        redirect: '/tools/filterTree',
        meta: {
          title: 'tools',
          icon: 'tools'
        },
        children: [
          {
            path: '/tools/filterTree',
            name: 'toolsFilterTree',
            component: () => import('@/views/ToolsPage/filterTree/index'),
            meta: {
              title: 'filterTree',
              icon: 'filterTree'
            }
          },
          {
            path: '/tools/hooktable',
            name: 'toolsHooktable',
            component: () => import('@/views/ToolsPage/HookTable/index'),
            meta: {
              title: 'hooktable',
              icon: 'hooktable'
            }
          },
          {
            path: '/tools/transfer',
            name: 'toolsTransfer',
            component: () => import('@/views/ToolsPage/Transfer/index'),
            meta: {
              title: 'structure',
              icon: 'structure'
            }
          }
        ]
      },
      {
        path: '/notesdetail',
        name: 'notesdetail',
        component: () => import('@/views/NotesPage/NoteDetail/index'),
        meta: {
          title: 'notesdetailManage'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory('/h'),
  routes: publicRoutes
})

export default router
