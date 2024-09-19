<template>
  <div class="page page-pad page-grey">
    <div class="body">
      <app-card class="receiver-card">
        <div class="item">
          <div class="item-title">收货人</div>
          <div class="item-value">
            <app-input class="input" placeholder="请填写收货人姓名" v-model="form.name"/>
          </div>
        </div>
        <div class="item">
          <div class="item-title">手机号码</div>
          <div class="item-value">
            <app-input class="input" placeholder="请填写收货人手机号" v-model="form.phone"/>
          </div>
        </div>
        <div class="item">
          <div class="item-title">所在地区</div>
          <div class="item-value">
            <div class="input" @click="areaPop.show = true">
              <span v-if="areaPop.label">{{ areaPop.label }}</span>
              <span v-else class="placeholder">省市区县、乡镇等</span>
            </div>
            <svg-icon icon="more" color="#333" class="icon"/>
          </div>
        </div>
        <div class="item">
          <div class="item-title">详细地址</div>
          <div class="item-value">
            <app-input class="input" placeholder="街道、楼牌号等" v-model="form.detail"/>
          </div>
        </div>
      </app-card>
      <app-card class="default-card">
        <div class="item">
          <div class="item-title">设置为默认地址</div>
          <div class="item-value">
            <van-switch v-model="form.isDefault" size="20px" active-color="#ff0033"/>
          </div>
        </div>
      </app-card>
    </div>

    <div class="footer safe-padding-bottom">
      <van-button
        class="btn"
        type="primary"
        loading-text="确定"
        :disabled="confirmLoading"
        :loading="confirmLoading"
        @click="submit"
        block
      >
        确定
      </van-button>
    </div>

    <van-popup v-model:show="areaPop.show" round position="bottom">
      <van-cascader
        v-model="areaPop.value"
        title="请选择所在地区"
        :options="areaPop.opts"
        @close="areaPop.show = false"
        @finish="selectAddr"
      />
    </van-popup>
  </div>
</template>

<script setup lang="ts" name="AddressDetail">
import { reactive, ref } from 'vue'
import { showToast } from 'vant'
import { useRoute, useRouter } from 'vue-router'
import { useCascaderAreaData } from '@vant/area-data'
import * as addrApi from '@/api/member/address'
import pattern from "@/utils/pattern"

const route = useRoute()
const router = useRouter()
const confirmLoading = ref(false)
const id = parseInt(route.query.id as string)
const isEdit = !!id
const form = ref({
  name: '',
  phone: '',
  province: '',
  city: '',
  county: '',
  detail: '',
  isDefault: false,
  provinceCode: '',
  cityCode: '',
  countyCode: '',
})
const areaPop = reactive({
  show: false,
  label: '',
  value: '',
  opts: useCascaderAreaData()
})

const selectAddr = (data: Recordable) => {
  const [province, city, county] = data.selectedOptions
  if (province) {
    form.value.province = province.text
    form.value.provinceCode = province.value
  }
  if (city) {
    form.value.city = city.text
    form.value.cityCode = city.value
  }
  if (county) {
    form.value.county = county.text
    form.value.countyCode = county.value
  }
  areaPop.label = province.text + city.text + county.text
  areaPop.show = false
}

const addAddress = () => {
  if (!verify()) return

  if (confirmLoading.value) return
  confirmLoading.value = true

  addrApi
    .addAddress(form.value)
    .then(() => {
      confirmLoading.value = false
      showToast({
        message: '添加地址成功',
        type: 'success',
      })
      router.back()
    })
    .catch(() => {
      confirmLoading.value = false
    })
}

const updateAddress = () => {
  if (!verify()) return

  if (confirmLoading.value) return
  confirmLoading.value = true

  addrApi
    .updateAddress({
      id: id, ...form.value
    })
    .then(() => {
      confirmLoading.value = false
      showToast({
        message: '更新地址成功',
        type: 'success',
      })
      router.back()
    })
    .catch(() => {
      confirmLoading.value = false
    })
}

const getAddress = () => {
  addrApi
    .getAddress(id)
    .then((res) => {
      const data = res.data.data
      form.value = data
      areaPop.label = data.province + data.city + data.county
      areaPop.value = data.countyCode
    })
    .catch(() => {
    })
}

const verify = () => {
  const { name, phone, detail } = form.value

  if (!name.trim()) {
    showToast({
      message: '请输入收货人姓名',
      type: 'text'
    })
    return false
  }

  if (!phone.trim()) {
    showToast({
      message: '请输入手机号',
      type: 'text'
    })
    return false
  }

  if (!pattern.phone.test(phone)) {
    showToast({
      message: '请输入正确手机号',
      type: 'text'
    })
    return false
  }

  if (!areaPop.label.trim()) {
    showToast({
      message: '请选择所在地区',
      type: 'text'
    })
    return false
  }

  if (!detail.trim()) {
    showToast({
      message: '请输入详细地址',
      type: 'text'
    })
    return false
  }

  return true
}

const submit = () => {
  if (isEdit) {
    return updateAddress()
  } else {
    return addAddress()
  }
}

const init = () => {
  if (isEdit) {
    getAddress()
  }
}

init()
</script>

<style lang="less" scoped>
.page {
  .body {
    .receiver-card {
      margin-bottom: calc(2 * var(--grid-size));

      .item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 0;

        &-title {
          width: 88px;
        }

        &-value {
          display: flex;
          align-items: center;
          flex: 1;

          .input {
            width: 100%;
            color: var(--font-color-default);

            &::placeholder {
              color: var(--font-color-black-l3);
            }
          }
        }

        &:first-child {
          padding-top: 0;
        }

        &:last-child {
          padding-bottom: 0;
        }
      }
    }

    .default-card {
      .item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 0;

        &-title {
        }

        &-value {
        }

        &:first-child {
          padding-top: 0;
        }

        &:last-child {
          padding-bottom: 0;
        }
      }
    }
  }

  .footer {
    position: fixed;
    z-index: 1;
    left: var(--page-padding-x);
    right: var(--page-padding-x);
    bottom: var(--bottom-button-offset);
    .btn {
      height: var(--action-button-height);
      border-radius: var(--action-button-radius);
    }
  }
}
</style>
