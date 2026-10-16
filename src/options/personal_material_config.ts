// import { useI18n } from 'vue-i18n'
// const { t } = useI18n()

// 就业状态
export const employmentStatusOptions = [
  {
    label: 'employed',
    value: 'Employed',
  },
  {
    label: 'selfEmployed',
    value: 'Self-Employed',
  },
  {
    label: 'unemployed',
    value: 'Unemployed',
  },
  {
    label: 'student',
    value: 'Student',
  },
  {
    label: 'retired',
    value: 'Retired',
  },
  {
    label: 'homemaker',
    value: 'Homemaker',
  },
  {
    label: 'other',
    value: 'Other',
  },
]

// 职位
export const jobTitleOptions = [
  {
    label: 'administrativeManager',
    value: 'Administrative and commercial managers',
  },
  {
    label: 'agriForestryFisheryLaborers',
    value: 'Agricultural, forestry and fishery labourers',
  },
  {
    label: 'armedForcesOtherRanks',
    value: 'Armed forces occupations, other ranks',
  },
  {
    label: 'assemblers',
    value: 'Assemblers',
  },
  {
    label: 'buildingTradesWorkers',
    value: 'Building and related trades workers, excluding electricians',
  },
  {
    label: 'businessAdminAssociate',
    value: 'Business and administration associate professionals',
  },
  {
    label: 'businessAdminProfessional',
    value: 'Business and administration professionals',
  },
  {
    label: 'chiefExecutives',
    value: 'Chief executives, senior officials and legislators',
  },
  {
    label: 'cleanersHelpers',
    value: 'Cleaners and helpers',
  },
  {
    label: 'commissionedOfficers',
    value: 'Commissioned armed forces officers',
  },
  {
    label: 'customerServiceClerks',
    value: 'Customer services clerks',
  },
  {
    label: 'driversOperators',
    value: 'Drivers and mobile plant operators',
  },
  {
    label: 'electricalElectronicTrades',
    value: 'Electrical and electronic trades workers',
  },
  {
    label: 'foodPreparationAssistants',
    value: 'Food preparation assistants',
  },
  {
    label: 'craftWorkers',
    value: 'Food processing, wood working, garment and other craft and related trades workers',
  },
  {
    label: 'clerks',
    value: 'General and keyboard clerks',
  },
  {
    label: 'handicraftPrinting',
    value: 'Handicraft and printing workers',
  },
  {
    label: 'healthAssociate',
    value: 'Health associate professionals',
  },
  {
    label: 'healthProfessionals',
    value: 'Health professionals',
  },
  {
    label: 'hospitalityManagers',
    value: 'Hospitality, retail and other services managers',
  },
  {
    label: 'ictTechnicians',
    value: 'Information and communications technicians',
  },
  {
    label: 'ictProfessionals',
    value: 'Information and communications technology professionals',
  },
  {
    label: 'miningConstructionLaborers',
    value: 'Labourers in mining, construction, manufacturing and transport',
  },
  {
    label: 'legalSocialCulturalProfessionals',
    value: 'Legal, social and cultural professionals',
  },
  {
    label: 'legalSocialAssociate',
    value: 'Legal, social, cultural and related associate professionals',
  },
  {
    label: 'agriWorkers',
    value: 'Market-oriented skilled agricultural workers',
  },
  {
    label: 'forestryFisheryWorkers',
    value: 'Market-oriented skilled forestry, fishery and hunting workers',
  },
  {
    label: 'metalMachineryWorkers',
    value: 'Metal, machinery and related trades workers',
  },
  {
    label: 'nonCommissionedOfficers',
    value: 'Non-commissioned armed forces officers',
  },
  {
    label: 'recordingClerks',
    value: 'Numerical and material recording clerks',
  },
  {
    label: 'others',
    value: 'Others',
  },
  {
    label: 'clericalSupport',
    value: 'Other clerical support workers',
  },
  {
    label: 'personalCareWorkers',
    value: 'Personal care workers',
  },
  {
    label: 'personalServiceWorkers',
    value: 'Personal service workers',
  },
  {
    label: 'productionManagers',
    value: 'Production and specialised services managers',
  },
  {
    label: 'protectiveServices',
    value: 'Protective services workers',
  },
  {
    label: 'refuseWorkers',
    value: 'Refuse workers and other elementary workers',
  },
  {
    label: 'salesWorkers',
    value: 'Sales workers',
  },
  {
    label: 'scienceEngineeringAssociate',
    value: 'Science and engineering associate professionals',
  },
  {
    label: 'scienceEngineeringProfessionals',
    value: 'Science and engineering professionals',
  },
  {
    label: 'machineOperators',
    value: 'Stationary plant and machine operators',
  },
  {
    label: 'streetSalesWorkers',
    value: 'Street and related sales and service workers',
  },
  {
    label: 'subsistenceWorkers',
    value: 'Subsistence farmers, fishers, hunters and gatherers',
  },
  {
    label: 'teachingProfessionals',
    value: 'Teaching professionals',
  },
]

// 账号用户
export const accountPurposeOptions = [
  {
    label: 'purchase',
    value: 'PURCHASE',
  },
  {
    label: 'billPayment',
    value: 'BILL_PAYMENT',
  },
  {
    label: 'education',
    value: 'EDUCATIONAL_EXPENSES',
  },
  {
    label: 'personalRemittance',
    value: 'PERSONAL_REMITTANCE',
  },
  {
    label: 'charity',
    value: 'CHARITABLE_DONATION',
  },
  {
    label: 'loanRepayment',
    value: 'LOAN_REPAYMENT',
  },
  {
    label: 'investment',
    value: 'INVESTMENT',
  },
  {
    label: 'other',
    value: 'OTHERS',
  },
]

// 个人行业
export const industryOptions = [
  {
    value: 'category1',
    label: 'category1',
    selectable: false,
    children: [
      { value: 'category1_Agriculture', label: 'agriculture' },
      { value: 'category1_Farming', label: 'farming' },
      { value: 'category1_Ranching', label: 'ranching' },
      { value: 'category1_Forestry and Logging', label: 'forestry_and_logging' },
      { value: 'category1_Fishery', label: 'fishery' },
      { value: 'category1_Construction', label: 'construction' },
      { value: 'category1_Construction and Development', label: 'construction_and_development'},
      { value: 'category1_Engineering', label: 'engineering' },
      { value: 'category1_Civil Engineering', label: 'civil_engineering' },
      { value: 'category1_Mechanical/Industrial Engineering', label: 'mechanical_industrial_engineering'},
      { value: 'category1_Manufacturing', label: 'manufacturing' },
      { value: 'category1_Industrial Automation', label: 'industrial_automation' },
      { value: 'category1_Machinery', label: 'machinery' },
      { value: 'category1_Building Materials', label: 'building_materials' },
      { value: 'category1_Chemicals', label: 'chemicals' },
      { value: 'category1_Glass/Ceramics/Concrete', label: 'glass_ceramics_concrete' },
      { value: 'category1_Plastics', label: 'plastics' },
      { value: 'category1_Paper/Forest Products', label: 'paper_forest_products' },
      { value: 'category1_Mining and Quarrying', label: 'mining_and_quarrying' },
      { value: 'category1_Oil and Gas', label: 'oil_and_gas' },
      { value: 'category1_Oil Energy/Solar/Greentech', label: 'oil_energy_solar_greentech' },
      { value: 'category1_Renewables Environment', label: 'renewables_environment' },
      { value: 'category1_Biotechnology/Greentech', label: 'biotechnology_greentech' },
      { value: 'category1_Automotive', label: 'automotive' },
      { value: 'category1_Shipbuilding', label: 'shipbuilding' },
      { value: 'category1_Railroad Manufacture', label: 'railroad_manufacture' },
      { value: 'category1_Electrical/Electronic Manufacturing',label: 'electrical_electronic_manufacturing'},
      { value: 'category1_Semiconductors', label: 'semiconductors' },
      { value: 'category1_Computer Hardware', label: 'computer_hardware' },
      { value: 'category1_Textiles', label: 'textiles' },
      { value: 'category1_Apparel/Fashion', label: 'apparel_fashion' },
      { value: 'category1_Cosmetics', label: 'cosmetics' },
      { value: 'category1_Tobacco', label: 'tobacco' },
      { value: 'category1_Dairy', label: 'dairy' },
      { value: 'category1_Food Production', label: 'food_production' },
      { value: 'category1_Packaging/Containers', label: 'packaging_containers' },
      { value: 'category1_Printing', label: 'printing' },
    ],
  },
  {
    value: 'category2',
    label: 'category2',
    selectable: false,
    children: [
      { value: 'category2_Information Technology/IT', label: 'information_technology_it' },
      { value: 'category2_Computer Software Engineering', label: 'computer_software_engineering'},
      { value: 'category2_Computer Networking', label: 'computer_networking' },
      { value: 'category2_Computer/Network Security', label: 'computer_network_security' },
      { value: 'category2_Information and Communications', label: 'information_and_communications'},
      { value: 'category2_Internet', label: 'internet' },
      { value: 'category2_Online Publishing', label: 'online_publishing' },
      { value: 'category2_Telecommunications', label: 'telecommunications' },
      { value: 'category2_Wireless', label: 'wireless' },
      { value: 'category2_Computer Games', label: 'computer_games' },
      { value: 'category2_Animation', label: 'animation' },
      { value: 'category2_Nanotechnology', label: 'nanotechnology' },
      { value: 'category2_Research Industry', label: 'research_industry' },
    ],
  },
  {
    value: 'category3',
    label: 'category3',
    selectable: false,
    children: [
      { value: 'category3_Banking/Financial/Insurance', label: 'banking_financial_insurance' },
      { value: 'category3_Banking/Mortgage', label: 'banking_mortgage' },
      { value: 'category3_Financial Services', label: 'financial_services' },
      { value: 'category3_Financial and Insurance', label: 'financial_and_insurance' },
      { value: 'category3_Capital Markets/Hedge Fund/Private Equity', label: 'capital_markets_hedge_fund_private_equity' },
      { value: 'category3_Investment Banking/Venture', label: 'investment_banking_venture' },
      { value: 'category3_Investment Management', label: 'investment_management' },
      { value: 'category3_Venture Capital/VC', label: 'venture_capital_vc' },
      { value: 'category3_Insurance', label: 'insurance' },
      { value: 'category3_Accounting/Audit/Consulting', label: 'accounting_audit_consulting' },
      { value: 'category3_Money Lending', label: 'money_lending' },
      { value: 'category3_Pawnshop', label: 'pawnshop' },
    ],
  },
  {
    value: 'category4',
    label: 'category4',
    selectable: false,
    children: [
      { value: 'category4_Hospital/Healthcare', label: 'hospital_healthcare' },
      { value: 'category4_Medical and Healthcare', label: 'medical_and_healthcare' },
      { value: 'category4_Health and Social Services', label: 'health_and_social_services' },
      { value: 'category4_Medical Practice', label: 'medical_practice' },
      { value: 'category4_Medical Equipment', label: 'medical_equipment' },
      { value: 'category4_Pharmaceuticals', label: 'pharmaceuticals' },
      { value: 'category4_Mental Healthcare', label: 'mental_healthcare' },
      { value: 'category4_Alternative Medicine', label: 'alternative_medicine' },
      { value: 'category4_Veterinary', label: 'veterinary' },
      { value: 'category4_Health/Fitness', label: 'health_fitness' },
    ],
  },
  {
    value: 'category5',
    label: 'category5',
    selectable: false,
    children: [
      { value: 'category5_Professional, Scientific and Technical', label: 'professional_scientific_and_technical' },
      { value: 'category5_Professional Services Firm', label: 'professional_services_firm' },
      { value: 'category5_Law Practice/Law Firms', label: 'law_practice_law_firms' },
      { value: 'category5_Legal Services', label: 'legal_services' },
      { value: 'category5_Legal and Judiciary', label: 'legal_and_judiciary' },
      { value: 'category5_Management Consulting', label: 'management_consulting' },
      { value: 'category5_Business Supplies/Equipment', label: 'business_supplies_equipment' },
      { value: 'category5_Human Resources/HR', label: 'human_resources_hr' },
      { value: 'category5_Staffing/Recruiting', label: 'staffing_recruiting' },
      { value: 'category5_Outsourcing Offshoring', label: 'outsourcing_offshoring' },
      { value: 'category5_Translation/Localization', label: 'translation_localization' },
      { value: 'category5_Market Research', label: 'market_research' },
      { value: 'category5_Public Relations/PR', label: 'public_relations_pr' },
      { value: 'category5_Security/Investigations', label: 'security_investigations' },
      { value: 'category5_Alternative Dispute Resolution', label: 'alternative_dispute_resolution' },
    ],
  },
  {
    value: 'category6',
    label: 'category6',
    selectable: false,
    children: [
      { value: 'category6_Media and Communications', label: 'media_and_communications' },
      { value: 'category6_Broadcast Media', label: 'broadcast_media' },
      { value: 'category6_Media Production', label: 'media_production' },
      { value: 'category6_Entertainment and Recreation', label: 'entertainment_and_recreation' },
      { value: 'category6_Entertainment/Movie Production', label: 'entertainment_movie_production' },
      { value: 'category6_Motion Pictures/Film', label: 'motion_pictures_film' },
      { value: 'category6_Arts/Crafts', label: 'arts_crafts' },
      { value: 'category6_Fine Art', label: 'fine_art' },
      { value: 'category6_Antiques and Art Piece', label: 'antiques_and_art_piece' },
      { value: 'category6_Performing Arts', label: 'performing_arts' },
      { value: 'category6_Music', label: 'music' },
      { value: 'category6_Newspaper/Journalism', label: 'newspaper_journalism' },
      { value: 'category6_Writing/Editing', label: 'writing_editing' },
      { value: 'category6_Publishing Industry', label: 'publishing_industry' },
      { value: 'category6_Graphic Design/Web Design', label: 'graphic_design_web_design' },
      { value: 'category6_Design', label: 'design' },
      { value: 'category6_Museums/Institutions', label: 'museums_institutions' },
      { value: 'category6_Library', label: 'library' },
    ],
  },
  {
    value: 'category7',
    label: 'category7',
    selectable: false,
    children: [
      { value: 'category7_Retail Industry', label: 'retail_industry' },
      { value: 'category7_Trading/Retail/Wholesale', label: 'trading_retail_wholesale' },
      { value: 'category7_Wholesale and Retail Trade', label: 'wholesale_and_retail_trade' },
      { value: 'category7_Supermarkets', label: 'supermarkets' },
      { value: 'category7_Consumer Goods', label: 'consumer_goods' },
      { value: 'category7_Consumer Electronics', label: 'consumer_electronics' },
      { value: 'category7_Luxury Goods/Jewelry', label: 'luxury_goods_jewelry' },
      { value: 'category7_Sporting Goods', label: 'sporting_goods' },
      { value: 'category7_Furniture', label: 'furniture' },
      { value: 'category7_Import/Export', label: 'import_export' },
      { value: 'category7_International Trade/Development', label: 'international_trade_development' },
      { value: 'category7_Logistics', label: 'logistics' },
      { value: 'category7_Transportation', label: 'transportation' },
      { value: 'category7_Transportation and Storage', label: 'transportation_and_storage' },
      { value: 'category7_Package/Freight Delivery', label: 'package_freight_delivery' },
      { value: 'category7_Warehousing', label: 'warehousing' },
      { value: 'category7_Maritime', label: 'maritime' },
      { value: 'category7_Airlines/Aviation', label: 'airlines_aviation' },
      { value: 'category7_Aviation/Aerospace', label: 'aviation_aerospace' },
    ],
  },
  {
    value: 'category8',
    label: 'category8',
    selectable: false,
    children: [
      { value: 'category8_Accommodation and Food Services', label: 'accommodation_and_food_services' },
      { value: 'category8_Hospitality', label: 'hospitality' },
      { value: 'category8_Hotel and Lodging', label: 'hotel_and_lodging' },
      { value: 'category8_Restaurants', label: 'restaurants' },
      { value: 'category8_Travel/Tourism', label: 'travel_tourism' },
      { value: 'category8_Leisure/Travel', label: 'leisure_travel' },
      { value: 'category8_Food and Beverages', label: 'food_and_beverages' },
      { value: 'category8_Wine/Spirits', label: 'wine_spirits' },
      { value: 'category8_Recreational Facilities/Services', label: 'recreational_facilities_services' },
      { value: 'category8_Gambling/Casinos', label: 'gambling_casinos' },
    ],
  },
  {
    value: 'category9',
    label: 'category9',
    selectable: false,
    children: [
      { value: 'category9_Education', label: 'education' },
      { value: 'category9_Higher Education/Academia', label: 'higher_education_academia' },
      { value: 'category9_Primary/Secondary Education', label: 'primary_secondary_education' },
      { value: 'category9_E-Learning', label: 'e_learning' },
      { value: 'category9_Professional Training', label: 'professional_training' },
    ],
  },
  {
    value: 'category10',
    label: 'category10',
    selectable: false,
    children: [
      { value: 'category10_Government Administration', label: 'government_administration' },
      { value: 'category10_Government Bodies', label: 'government_bodies' },
      { value: 'category10_Public Administration and Defense', label: 'public_administration_and_defense' },
      { value: 'category10_Government Relations', label: 'government_relations' },
      { value: 'category10_International Affairs', label: 'international_affairs' },
      { value: 'category10_Legislative Office', label: 'legislative_office' },
      { value: 'category10_Political Organization', label: 'political_organization' },
      { value: 'category10_Non-Profit Organization', label: 'non_profit_organization' },
      { value: 'category10_Non-Profit Volunteering', label: 'non_profit_volunteering' },
      { value: 'category10_Civic/Social Organization', label: 'civic_social_organization' },
      { value: 'category10_Philanthropy', label: 'philanthropy' },
      { value: 'category10_Fundraising', label: 'fundraising' },
      { value: 'category10_Religious Institutions', label: 'religious_institutions' },
      { value: 'category10_Military Industry', label: 'military_industry' },
      { value: 'category10_Defense/Space', label: 'defense_space' },
      { value: 'category10_Law Enforcement', label: 'law_enforcement' },
      { value: 'category10_Public Safety', label: 'public_safety' },
      { value: 'category10_Judiciary', label: 'judiciary' },
      { value: 'category10_Individual/Family Services', label: 'individual_family_services' },
      { value: 'category10_Domestic Personnel Employment', label: 'domestic_personnel_employment' },
      { value: 'category10_Think Tanks', label: 'think_tanks' },
      { value: 'category10_Extra-Territorial Organizations', label: 'extra_territorial_organizations'},
      { value: 'category10_Events Services', label: 'events_services' },
      { value: 'category10_Program Development', label: 'program_development' },
    ],
  },
  {
    value: 'category11',
    label: 'category11',
    selectable: false,
    children: [
      { value: 'category11_Others', label: 'others' },
      { value: 'category11_Other Industry', label: 'other_industry' },
      { value: 'category11_Other Service Activities', label: 'other_service_activities' },
    ],
  },
  {
    value: 'category12',
    label: 'category12',
    selectable: false,
    children: [{ value: 'category12_Unknown', label: 'unknown' }],
  },
]
