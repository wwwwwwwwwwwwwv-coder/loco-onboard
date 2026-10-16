<script lang="ts" setup>
import type { UnwrapRef } from 'vue'
import type { Rule } from 'ant-design-vue/es/form'
import { useI18n } from 'vue-i18n'
import {
  AmountOption,
  AssetClassOption,
  KnowledgeLevelOption,
  TradesPerYearOption,
  YearsTradingOption,
} from '@/options'
import { securitiesSubmitApi } from '@/api'

defineOptions({
  name: 'kycWidget2',
})

const route = useRoute()
const { t } = useI18n()

const props = defineProps<{
  initialData: Record<string, any>
  widget1Data: Record<string, any>
}>()
const emit = defineEmits<{
  previous: []
  submitted: []
}>()

const initialSurveys = Array.isArray(props.initialData.gatUserSurveys)
  ? props.initialData.gatUserSurveys.map((item: any) => ({
      bondKnowledgeLevel: item.bondKnowledgeLevel,
      investmentCategories: item.investmentCategories,
      tradesPerYear: item.tradesPerYear,
      tradingExperienceYears: item.tradingExperienceYears,
    }))
  : []

const formState: UnwrapRef<any> = reactive({
  investmentAmount: props.initialData.investmentAmount ?? null,
  totalInvestmentValue: props.initialData.totalInvestmentValue ?? null,
  investmentCategories: Array.isArray(props.initialData.investmentCategories)
    ? [...props.initialData.investmentCategories]
    : initialSurveys.map((item: any) => item.investmentCategories),
  gatUserSurveys: initialSurveys,
})
const formRef = ref()
const submitting = ref(false)

watch(
  () => formState.investmentCategories,
  (newCategories) => {
    formState.gatUserSurveys = newCategories.map((type: string) => {
      const existing = formState.gatUserSurveys.find(
        (item: any) => item.investmentCategories === type,
      )
      return (
        existing || {
          investmentCategories: type,
          bondKnowledgeLevel: null,
          tradesPerYear: null,
          tradingExperienceYears: null,
        }
      )
    })
  },
  { immediate: true, deep: true },
)

const getSurvey = (value: any) => {
  return formState.gatUserSurveys.find((s: any) => s.investmentCategories === value) || {}
}

const rules: Record<string, Rule[]> = {
  investmentAmount: [{ required: true, message: t('requiredField'), trigger: 'change' }],
  totalInvestmentValue: [{ required: true, message: t('requiredField'), trigger: 'change' }],
  investmentCategories: [
    {
      type: 'array',
      required: true,
      message: t('bst.selectAtLeastOne'),
      trigger: 'change',
    },
  ],
}

const onSubmit = async () => {
  if (submitting.value) return

  submitting.value = true
  try {
    await formRef.value.validate()
    const params: any = {
      ...props.widget1Data,
      tempToken: route.query.t,
      isAllCommit: true,
      investmentAmount: formState.investmentAmount,
      totalInvestmentValue: formState.totalInvestmentValue,
      investmentCategories: formState.investmentCategories,
      gatUserSurveys: formState.gatUserSurveys,
    }
    await securitiesSubmitApi(params)
    emit('submitted')
  } catch (error) {
    console.log('error', error)
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <a-form ref="formRef" :model="formState" :rules="rules" layout="vertical" size="large">
    <div class="mb-24px">
      <h3 class="text-[18px] font-600">{{ t('bst.complianceQuestionnaire') }}</h3>
    </div>
    <a-form-item :label="t('bst.investmentAmount')" name="investmentAmount">
      <a-select v-model:value="formState.investmentAmount" :placeholder="t('bst.selectAmount')">
        <a-select-option v-for="v in AmountOption" :key="v.value" :value="v.value">
          {{ v.label }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item :label="t('bst.totalInvestmentValue')" name="totalInvestmentValue">
      <a-select
        v-model:value="formState.totalInvestmentValue"
        :placeholder="t('bst.selectTotalValue')"
      >
        <a-select-option v-for="v in AmountOption" :key="v.value" :value="v.value">
          {{ v.label }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <div class="mt-[24px] mb-24px">
      <h3 class="text-[18px] font-600">{{ t('bst.investmentBackgroundSurvey') }}</h3>
    </div>

    <a-form-item :label="t('bst.investmentExperience')" name="investmentCategories" required>
      <a-checkbox-group v-model:value="formState.investmentCategories">
        <template v-for="item in AssetClassOption" :key="item.value">
          <a-checkbox :value="item.value" name="type">
            {{ t(`bst.investmentOptions.${item.value}`) }}
          </a-checkbox>

          <template v-if="formState.investmentCategories.includes(item.value)">
            <a-form-item
              :name="[
                'gatUserSurveys',
                formState.gatUserSurveys.findIndex(
                  (s: any) => s.investmentCategories === item.value,
                ),
                'bondKnowledgeLevel',
              ]"
              :rules="[{ required: true, message: t('bst.selectKnowledge'), trigger: 'change' }]"
              class="mb-0!"
            >
              <a-select
                v-model:value="getSurvey(item.value).bondKnowledgeLevel"
                :placeholder="t('bst.selectKnowledgeLevel')"
                class="w-full md:w-[400px]!"
              >
                <a-select-option v-for="v in KnowledgeLevelOption" :key="v.value" :value="v.value">
                  {{ t(`bst.knowledgeOptions.${v.value}`) }}
                </a-select-option>
              </a-select>
            </a-form-item>

            <a-form-item
              :name="[
                'gatUserSurveys',
                formState.gatUserSurveys.findIndex(
                  (s: any) => s.investmentCategories === item.value,
                ),
                'tradesPerYear',
              ]"
              :rules="[
                { required: true, message: t('bst.selectTradesRequired'), trigger: 'change' },
              ]"
              class="mb-0!"
            >
              <a-select
                v-model:value="getSurvey(item.value).tradesPerYear"
                :placeholder="t('bst.selectTrades')"
                class="w-full md:w-[400px]!"
              >
                <a-select-option v-for="v in TradesPerYearOption" :key="v.value" :value="v.value">
                  {{ t(`bst.tradesOptions.${v.value}`) }}
                </a-select-option>
              </a-select>
            </a-form-item>

            <a-form-item
              :name="[
                'gatUserSurveys',
                formState.gatUserSurveys.findIndex(
                  (s: any) => s.investmentCategories === item.value,
                ),
                'tradingExperienceYears',
              ]"
              :rules="[
                { required: true, message: t('bst.selectYearsRequired'), trigger: 'change' },
              ]"
            >
              <a-select
                v-model:value="getSurvey(item.value).tradingExperienceYears"
                :placeholder="t('bst.selectYears')"
                class="w-full md:w-[400px]!"
              >
                <a-select-option v-for="v in YearsTradingOption" :key="v.value" :value="v.value">
                  {{ t(`bst.yearsOptions.${v.value}`) }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </template>
        </template>
      </a-checkbox-group>
    </a-form-item>
  </a-form>

  <div class="mt-30px flex flex-col">
    <a-button
      :loading="submitting"
      class="w-full md:w-auto min-w-200px"
      size="large"
      type="primary"
      @click="onSubmit"
    >
      {{ t('submit') }}
    </a-button>
    <a-button class="w-full mt-[10px]" size="large" @click="emit('previous')">
      {{ t('previousStep') }}
    </a-button>
  </div>
</template>

<style lang="scss" scoped>
:deep(.ant-checkbox-group) {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

:deep(.ant-form-item) {
  margin-bottom: 16px;
}

:deep(.ant-checkbox-wrapper + .ant-checkbox-wrapper) {
  margin-top: 8px;
}

:deep(.ant-checkbox + span) {
  white-space: break-spaces;
}
</style>
