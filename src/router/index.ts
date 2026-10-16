import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Root',
      redirect: '/help',
    },
    {
      path: '/securities',
      name: 'Securities',
      component: () => import('@/views/securities/index.vue'),
    },
    {
      path: '/success',
      name: 'Success',
      component: () => import('@/views/success/index.vue'),
    },
    {
      path: '/help',
      name: 'Help',
      redirect: { name: 'HelpCategory' },
      component: () => import('@/views/help/index.vue'),
      children: [
        {
          path: 'category',
          name: 'HelpCategory',
          component: () => import('@/views/help/category.vue'),
        },
        {
          path: 'subcategory/:id',
          name: 'HelpSubcategory',
          component: () => import('@/views/help/subcategory.vue'),
        },
        {
          path: 'article/:id',
          name: 'HelpArticle',
          component: () => import('@/views/help/article.vue'),
        },
      ],
    },
    {
      path: '/kyc',
      name: 'KYC',
      // redirect: { name: 'KYCCompany' },
      component: () => import('@/views/kyc/index.vue'),
      children: [
        {
          path: 'company',
          name: 'KYCCompany',
          component: () => import('@/views/kyc/company/index.vue'),
        },
        {
          path: 'personal-supplement-material',
          name: 'PersonalSupplementMaterial',
          component: () => import('@/views/kyc/personal_material/index.vue'),
        },
      ],
    },
    {
      path: '/verifyId',
      name: 'VerifyID',
      component: () => import('@/views/verify_id/index.vue'),
    },
    {
      path: '/rfi',
      name: 'RFI',
      component: () => import('@/views/rfi/index.vue'),
    },
    {
      path: '/bst',
      name: 'BST',
      component: () => import('@/views/bst/index.vue'),
    },
    {
      path: '/:pathMatch(.*)',
      redirect: '/help',
    },
  ],
})

export default router
