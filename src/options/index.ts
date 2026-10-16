
export const identificationTypeOptions = [
  {
    label: 'passport',
    value: 'PASSPORT',
  },
  {
    label: 'driver_license',
    value: 'DRIVERS_LICENSE',
  },
  {
    label: 'national_id',
    value: 'NATIONAL_ID',
  },
]

export const companyTypeOptions = [
  {
    label: 'sole_proprietor',
    value: 'SOLE_PROPRIETOR',
  },
  {
    label: 'limited_company',
    value: 'LIMITED_COMPANY',
  },
  {
    label: 'partnership',
    value: 'PARTNERSHIP',
  },
  {
    label: 'listed',
    value: 'LISTED',
  },
  {
    label: 'others',
    value: 'OTHERS',
  },
]

export const taxTypeOptions = [
  {
    label: 'vat',
    value: 'VAT',
  },
  {
    label: 'gst',
    value: 'GST',
  },
  {
    label: 'tax',
    value: 'TAX',
  },
]

// 企业行业
export const industryOptions = [
  {
    value: 'category1',
    label: 'category1',
    selectable: false,
    children: [
      { value: 'category1_5013', label: 'auto_parts_accessories' },
      { value: 'category1_5021', label: 'furniture' },
      { value: 'category1_5045', label: 'devices_electronics' },
      { value: 'category1_5047', label: 'medical_devices' },
      { value: 'category1_5094', label: 'jewelry_watches_precious_metals' },
      { value: 'category1_5111', label: 'office_school_supplies' },
      { value: 'category1_5122', label: 'drugstore_personal_care_supplements' },
      { value: 'category1_5193', label: 'florists' },
      { value: 'category1_5261', label: 'gardening' },
      { value: 'category1_5399', label: 'food_beverage' },
      { value: 'category1_5411', label: 'groceries' },
      { value: 'category1_5511', label: 'automotive' },
      { value: 'category1_5641', label: 'mother_baby_goods' },
      { value: 'category1_5691', label: 'clothing_accessories' },
      { value: 'category1_5712', label: 'household_goods' },
      { value: 'category1_5722', label: 'home_appliances' },
      { value: 'category1_5733', label: 'musical_instruments' },
      { value: 'category1_5941', label: 'sports_outdoor' },
      { value: 'category1_5945', label: 'toys_hobbies' },
      { value: 'category1_5947', label: 'adult_products' },
      { value: 'category1_5977', label: 'beauty_cosmetics' },
      { value: 'category1_5993', label: 'tobacco_marijuana_products' },
      { value: 'category1_5995', label: 'pet_supplies' },
      { value: 'category1_8043', label: 'eyeglasses_optical_goods' },
    ],
  },
  {
    value: 'category2',
    label: 'category2',
    selectable: false,
    children: [
      { value: 'category2_4121', label: 'ridesharing_taxis_limos' },
      { value: 'category2_4411', label: 'water_transportation' },
      { value: 'category2_4511', label: 'air_transportation' },
      { value: 'category2_4722', label: 'travel_agency' },
      { value: 'category2_7011', label: 'hotels_inns_motels' },
      { value: 'category2_7512', label: 'car_rental' },
    ],
  },
  {
    value: 'category3',
    label: 'category3',
    selectable: false,
    children: [
      { value: 'category3_5047', label: 'medical_devices' },
      { value: 'category3_5122', label: 'supplements_and_nutraceuticals' },
      { value: 'category3_5261', label: 'gardening' },
      { value: 'category3_5262', label: 'online_marketplaces' },
      { value: 'category3_5399', label: 'food_and_beverage' },
      { value: 'category3_5411', label: 'grocery_stores' },
      { value: 'category3_5511', label: 'automotive_dealers' },
      { value: 'category3_5533', label: 'auto_parts_and_accessories' },
      { value: 'category3_5641', label: 'mother_and_baby_goods' },
      { value: 'category3_5691', label: 'clothing_and_accessories' },
      { value: 'category3_5712', label: 'furniture' },
      { value: 'category3_5719', label: 'household_goods' },
      { value: 'category3_5722', label: 'home_appliances' },
      { value: 'category3_5732', label: 'devices_and_electronics' },
      { value: 'category3_5733', label: 'musical_instruments' },
      { value: 'category3_5812', label: 'restaurants_and_bars' },
      { value: 'category3_5912', label: 'drugstore_and_personal_care' },
      { value: 'category3_5941', label: 'sports_and_outdoor' },
      { value: 'category3_5943', label: 'office_and_school_supplies' },
      { value: 'category3_5944', label: 'jewelry_watches_precious_metals' },
      { value: 'category3_5945', label: 'toys_and_hobbies' },
      { value: 'category3_5947', label: 'adult_products' },
      { value: 'category3_5977', label: 'beauty_and_cosmetics' },
      { value: 'category3_5992', label: 'florists' },
      { value: 'category3_5993', label: 'vape_tobacco_related' },
      { value: 'category3_5995', label: 'pet_supplies' },
      { value: 'category3_8043', label: 'eyeglasses_optical_goods' },
    ],
  },
  {
    value: 'category4',
    label: 'category4',
    selectable: false,
    children: [
      { value: 'category4_1520', label: 'construction' },
      { value: 'category4_1711', label: 'plumbing_hvac' },
      { value: 'category4_1731', label: 'electrical_work' },
      { value: 'category4_1799', label: 'special_trade_contractors' },
      { value: 'category4_4900', label: 'utilities' },
      { value: 'category4_6513', label: 'real_estate_management' },
      { value: 'category4_7299', label: 'others' },
      { value: 'category4_7349', label: 'cleaning_sanitization' },
      { value: 'category4_8911', label: 'architectural_engineering_services' },
    ],
  },
  {
    value: 'category5',
    label: 'category5',
    selectable: false,
    children: [
      { value: 'category5_2741', label: 'publishing_printing' },
      { value: 'category5_4214', label: 'warehousing_distribution' },
      { value: 'category5_4215', label: 'courier_shipping' },
      { value: 'category5_7221', label: 'photography' },
      { value: 'category5_7311', label: 'marketing_advertising' },
      { value: 'category5_7333', label: 'art_design' },
      { value: 'category5_7361', label: 'hr_solutions' },
      { value: 'category5_7372', label: 'it_consulting' },
      { value: 'category5_7392', label: 'management_consulting' },
      { value: 'category5_7399', label: 'administrative_services' },
      { value: 'category5_8111', label: 'legal_services' },
      { value: 'category5_8931', label: 'accounting_audit_tax' },
      { value: 'category5_9399', label: 'government_public_services' },
    ],
  },
  {
    value: 'category6',
    label: 'category6',
    selectable: false,
    children: [
      { value: 'category6_5511', label: 'automotive_repair_maintenance' },
      { value: 'category6_7210', label: 'laundry_cleaning_services' },
      { value: 'category6_7298', label: 'beauty_salons_barbers' },
      { value: 'category6_7379', label: 'devices_electronics_repair' },
      { value: 'category6_7997', label: 'fitness_facilities' },
      { value: 'category6_8099', label: 'wellness_counselling' },
    ],
  },
  {
    value: 'category7',
    label: 'category7',
    selectable: false,
    children: [
      { value: 'category7_0742', label: 'veterinary_services' },
      { value: 'category7_8011', label: 'clinics' },
      { value: 'category7_8050', label: 'nursing_care_facilities' },
      { value: 'category7_8062', label: 'hospitals' },
      { value: 'category7_8099', label: 'mental_health_services' },
    ],
  },
  {
    value: 'category8',
    label: 'category8',
    selectable: false,
    children: [
      { value: 'category8_5046', label: 'industrial_machinery_and_equipment' },
      { value: 'category8_5047', label: 'medical_devices' },
      { value: 'category8_5085', label: 'rubber_and_plastics_products' },
      { value: 'category8_5122', label: 'supplements_and_nutraceuticals' },
      { value: 'category8_5211', label: 'lumber_and_wood_products' },
      { value: 'category8_5399', label: 'food_and_beverage_non_alcoholic' },
      { value: 'category8_5691', label: 'clothing_and_accessories' },
      { value: 'category8_5712', label: 'furniture' },
      { value: 'category8_5722', label: 'home_appliances' },
      { value: 'category8_5732', label: 'computer_and_electronics' },
      { value: 'category8_5912', label: 'pharmaceuticals' },
      { value: 'category8_5921', label: 'alcohol_production' },
      { value: 'category8_5993', label: 'tobacco_and_marijuana_products' },
      { value: 'category8_5999', label: 'paper_products' },
      { value: 'category8_7394', label: 'equipment_rental_and_leasing' },
    ],
  },
  {
    value: 'category9',
    label: 'category9',
    selectable: false,
    children: [
      { value: 'category9_4829', label: 'money_transmission' },
      { value: 'category9_6012', label: 'digital_wallet_investment_loan' },
      { value: 'category9_6211', label: 'security_brokers_dealers' },
      { value: 'category9_6300', label: 'insurance' },
    ],
  },
  {
    value: 'category10',
    label: 'category10',
    selectable: false,
    children: [
      { value: 'category10_4722', label: 'event_ticketing' },
      { value: 'category10_7032', label: 'recreational_camps' },
      { value: 'category10_7800', label: 'lotteries' },
      { value: 'category10_7801', label: 'gambling' },
      { value: 'category10_7832', label: 'movie_theaters' },
      { value: 'category10_7929', label: 'entertainment_performers' },
      { value: 'category10_7941', label: 'professional_sports' },
      { value: 'category10_7991', label: 'tourist_attractions' },
      { value: 'category10_7997', label: 'membership_clubs' },
      { value: 'category10_8398', label: 'ngo_charity' },
      { value: 'category10_8651', label: 'political_organizations' },
      { value: 'category10_8661', label: 'religious_organizations' },
    ],
  },
  {
    value: 'category11',
    label: 'category11',
    selectable: false,
    children: [
      { value: 'category11_8211', label: 'primary_secondary_schools' },
      { value: 'category11_8220', label: 'colleges_universities' },
      { value: 'category11_8249', label: 'vocational_trade_schools' },
      { value: 'category11_8299', label: 'online_education' },
      { value: 'category11_8351', label: 'child_care' },
    ],
  },
  {
    value: 'category12',
    label: 'category12',
    selectable: false,
    children: [
      { value: 'category12_5815', label: 'digital_content' },
      { value: 'category12_5816', label: 'games' },
      { value: 'category12_5817', label: 'social_media' },
      { value: 'category12_6051', label: 'crypto_blockchain' },
      { value: 'category12_7273', label: 'dating_matchmaking' },
      { value: 'category12_7372', label: 'software_development' },
      { value: 'category12_7375', label: 'financial_data_research' },
    ],
  },
]

export const turnoverMonthlyOptions = [
  {
    label: 'lt50k',
    value: 'TM001',
  },
  {
    label: '50k_100k',
    value: 'TM002',
  },
  {
    label: '100k_250k',
    value: 'TM003',
  },
  {
    label: '250k_500k',
    value: 'TM004',
  },
  {
    label: 'gt500k',
    value: 'TM005',
  },
]

export const numberOfEmployeeOptions = [
  {
    label: 'emp_0_1',
    value: 'BS001',
  },
  {
    label: 'emp_2_10',
    value: 'BS002',
  },
  {
    label: 'emp_11_50',
    value: 'BS003',
  },
  {
    label: 'emp_51_200',
    value: 'BS004',
  },
  {
    label: 'emp_over_200',
    value: 'BS005',
  },
]


// 开户目的
export const accountPurposeOptions = [
  // {
  //   label: 'business_payments',
  //   value: 'BUSINESS_PAYMENT',
  // },
  // {
  //   label: 'bill_payment',
  //   value: 'BILL_PAYMENT',
  // },
  // {
  //   label: 'charitable_donation',
  //   value: 'CHARITABLE_DONATION',
  // },
  // {
  //   label: 'loan_repayment',
  //   value: 'LOAN_REPAYMENT',
  // },
  // {
  //   label: 'investment',
  //   value: 'INVESTMENT',
  // },
  // {
  //   label: 'collection_of_business',
  //   value: 'COLLECTION_OF_BUSINESS',
  // },

  {
    label: 'PAYMENT_COLLECTION',
    value: 'PAYMENT_COLLECTION',
  },
  {
    label: 'PAYOUT_DISBURSEMENT',
    value: 'PAYOUT_DISBURSEMENT',
  },
  {
    label: 'MULTI_CURRENCY_BANKING',
    value: 'MULTI_CURRENCY_BANKING',
  },
  {
    label: 'CARD_ISSUING',
    value: 'CARD_ISSUING',
  },
  {
    label: 'CRYPTO_RAMP',
    value: 'CRYPTO_RAMP',
  },
  {
    label: 'GLOBAL_TRANSFER',
    value: 'GLOBAL_TRANSFER',
  },
  {
    label: 'TREASURY_FX',
    value: 'TREASURY_FX',
  },
  {
    label: 'others',
    value: 'OTHERS',
  },
]

export const jobTitleOptions = [
  {
    label: 'director',
    value: 'DIRECTOR',
  },
  {
    label: 'beneficial_owner',
    value: 'BENEFICIAL_OWNER',
  },
  {
    label: 'bo_and_director',
    value: 'BENEFICIAL_OWNER_AND_DIRECTOR',
  },
  {
    label: 'authorised_person',
    value: 'AUTHORISED_PERSON',
  },
]

//
export const AmountOption = [
  { value: 1, label: '<5,000' },
  { value: 2, label: '5,001-10,000' },
  { value: 3, label: '10,001-50,000' },
  { value: 4, label: '50,001-100,000' },
  { value: 5, label: '100,001-200,000' },
  { value: 6, label: '200,001-300,000' },
  { value: 7, label: '300,001-400,000' },
  { value: 8, label: '400,001-500,000' },
  { value: 9, label: '500,001-750,000' },
  { value: 10, label: '750,001-1,000,000' },
  { value: 11, label: '1,000,001-1,500,000' },
  { value: 12, label: '1,500,001-2,000,000' },
  { value: 13, label: '2,000,001-3,000,000' },
  { value: 14, label: '3,000,001-4,000,000' },
  { value: 15, label: '4,000,001-5,000,000' },
  { value: 16, label: '>5,000,000' },
]

// 投资经验
export const AssetClassOption = [
  { value: 'STK', label: '股票（ETF、ADR 和 共同基金）' },
  { value: 'BOND', label: '债券（国债、市政债券/公司债券）' },
  { value: 'OPT', label: '期货' },
  { value: 'FUT', label: '期货（包括单只股票期货和期货期权）' },
  { value: 'CASH', label: '外汇（包括货币转换和杠杆外汇）' },
  { value: 'MRGN', label: '保证金（仅适用于 IB-UK/IB-EU/IB-IE/IB-CE 账户申请保证金交易）' },
]

// 知识水平
export const KnowledgeLevelOption = [
  { value: 'None', label: '完全不了解' },
  { value: 'Limited', label: '有限认知' },
  { value: 'Good', label: '良好经验' },
  { value: 'Extensive', label: '资深' },
]

// 交易次数
export const TradesPerYearOption = [
  { value: 1, label: '少于5次' },
  { value: 2, label: '5-12次' },
  { value: 3, label: '13-50次' },
  { value: 4, label: '51-200次' },
  { value: 5, label: '超过200次' },
]

// 交易年限
export const YearsTradingOption = [
  { value: 1, label: '毫无经验' },
  { value: 2, label: '少于1年' },
  { value: 3, label: '1-3年' },
  { value: 4, label: '3-5年' },
  { value: 5, label: '5年以上' },
]
