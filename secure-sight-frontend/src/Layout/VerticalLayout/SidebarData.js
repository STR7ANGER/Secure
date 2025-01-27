const SidebarData = [
  {
    label: 'Dashboard',
    isMainMenu: true
  },
  {
    label: 'Dashboard',
    icon: 'ri-dashboard-fill',
    url: '/dashboard/create-dashboard',
    // issubMenubadge: true,
    bgcolor: 'bg-primary',
    // badgeValue: "3",
    subItem: [
      {
        sublabel: 'Create Dashboard',
        link: '/dashboard/create-dashboard'
      },
      {
        sublabel: 'Dashboard ',
        link: '/dashboard/dashboard-list'
      }
      // {
      // 	sublabel: "Container Security",
      // 	link: "/dashboard/container-security",
      // },
      // {
      // 	sublabel: "Cloud One Conformity",
      // 	link: "/dashboard/cloudone-conformity",
      // },
      // {
      // 	sublabel: "Smart Checks",
      // 	link: "/dashboard/smart-checks",
      // },
    ]
  },
  {
    label: 'Report',
    isMainMenu: true
  },
  {
    label: 'Reports',
    icon: 'ri-table-2',
    subItem: [
      {
        sublabel: 'Create Report',
        link: '/report/create-report'
      },
      // {
      //   sublabel: "Report Schedule",
      //   link: "/report/report-schedule",
      // },
      {
        sublabel: 'Report List',
        link: '/report/report-list'
      }

      // {
      //   sublabel: "Cloud Inventory",
      //   link: "/report/inventory-report",
      // },
    ]
  },
  // {
  // 	label: "cloud one",
  // 	isMainMenu: true,
  // },
  // {
  // 	label: "cloud one",
  // 	icon: "ri-cloud-fill",
  // 	subItem: [
  // 		{
  // 			sublabel: "Cloudone Conformity",
  // 			link: "/cloudone/cloudone-conformity",
  // 		},
  // 		{
  // 			sublabel: "Cloudone Container Security",
  // 			link: "/cloudone/container-security",
  // 		},
  // 		{
  // 			sublabel: "Smart Checks",
  // 			link: "/cloudone/smart-checks",
  // 		},
  // 	],
  // },
  // {
  //   label: "Tenable",
  //   isMainMenu: true,
  // },
  // {
  // 	label: "Tenable",
  // 	icon: "ri-cloud-fill",
  // 	isHasArrow: true,
  // 	url: "/report/tenable",
  // },

  // {
  // 	label: "Inventory",
  // 	isMainMenu: true,
  // },
  // {
  // 	label: "Inventory",
  // 	icon: "ri-table-2",
  // 	subItem: [
  // 		{
  // 			sublabel: "AWS Inventory",
  // 			icon: "logos logos-aws",
  // 			link: "/inventory/aws-inventory",
  // 		},
  // 		{
  // 			sublabel: "Azure Inventory",
  // 			link: "/inventory/azure-inventory",
  // 		},
  // 		{
  // 			sublabel: "GCP Inventory",
  // 			link: "/inventory/gcp-inventory",
  // 		},
  // 	],
  // },
  {
    label: 'Connector',
    isMainMenu: true
  },
  {
    label: 'Connector',
    icon: 'mdi mdi-transit-connection-variant',
    url: '/connector',
    bgcolor: 'bg-primary',
    subItem: [
      { sublabel: 'Upload & Config', link: '/connector-upload' },
      // { sublabel: "List", link: "/connector-list" },
      { sublabel: 'Schedule', link: '/connector-schedule' }
      // { sublabel: "Index Delete", link: "/connector-index-delete" },
    ]
  },
  {
    label: 'CSV Data',
    isMainMenu: true
  },
  {
    label: 'CSV-Data',
    icon: 'ri-file-excel-2-fill',
    url: '/csv',
    bgcolor: 'bg-primary',
    subItem: [
      // { sublabel: "CSV Upload", link: "/csv-upload" },
      { sublabel: 'CSV List', link: '/csv-list' },
      // { sublabel: "Delete", link: "/csv-delete" },
      { sublabel: 'Json', link: '' },
      { sublabel: 'Excel', link: '' }
    ]
  }
  // {
  // 	label: "Calendar",
  // 	icon: "mdi mdi-calendar-outline",
  // 	isHasArrow: true,
  // 	url: "/calendar",
  // },
  // {
  // 	label: "Email",
  // 	icon: "mdi mdi-email-outline",
  // 	subItem: [
  // 		{ sublabel: "Inbox", link: "/inbox" },
  // 		{ sublabel: "Read Email", link: "/read-email" },
  // 		{ sublabel: "Email Compose", link: "/compose-email" },
  // 	],
  // },
  // {
  // 	label: "Pages",
  // 	isMainMenu: true,
  // },
  // {
  // 	label: "Authentication",
  // 	icon: "mdi mdi-account-circle-outline",
  // 	subItem: [
  // 		{ sublabel: "Login", link: "/auth-login" },
  // 		{ sublabel: "Register", link: "/auth-register" },
  // 		{ sublabel: "Recover Password", link: "/auth-recoverpw" },
  // 		{ sublabel: "Lock Screen", link: "/auth-lock-screen" },
  // 	],
  // },
  // {
  // 	label: "Utility",
  // 	icon: "mdi mdi-format-page-break",
  // 	subItem: [
  // 		{ sublabel: "Starter Page", link: "/pages-starter" },
  // 		{ sublabel: "Maintenance", link: "/pages-maintenance" },
  // 		{ sublabel: "Coming Soon", link: "/pages-comingsoon" },
  // 		{ sublabel: "Timeline", link: "/pages-timeline" },
  // 		{ sublabel: "FAQs", link: "/pages-faqs" },
  // 		{ sublabel: "Pricing", link: "/pages-pricing" },
  // 		{ sublabel: "Error 404", link: "/pages-404" },
  // 		{ sublabel: "Error 500", link: "/pages-500" },
  // 	],
  // },
  // {
  // 	label: "Components",
  // 	isMainMenu: true,
  // },
  // {
  // 	label: "UI Elements",
  // 	icon: "mdi mdi-briefcase-variant-outline",
  // 	subItem: [
  // 		{ sublabel: "Alerts", link: "/ui-alerts" },
  // 		{ sublabel: "Badge", link: "/ui-badge" },
  // 		{ sublabel: "Breadcrumb", link: "/ui-breadcrumb" },
  // 		{ sublabel: "Buttons", link: "/ui-buttons" },
  // 		{ sublabel: "Cards", link: "/ui-cards" },
  // 		{ sublabel: "Carousel", link: "/ui-carousel" },
  // 		{ sublabel: "Dropdowns", link: "/ui-dropdowns" },
  // 		{ sublabel: "Grid", link: "/ui-grid" },
  // 		{ sublabel: "Images", link: "/ui-images" },
  // 		{ sublabel: "Lightbox", link: "/ui-lightbox" },
  // 		{ sublabel: "Modals", link: "/ui-modals" },
  // 		{ sublabel: "Offcanvas", link: "/ui-offcanvas" },
  // 		{ sublabel: "Range Slider", link: "/ui-rangeslider" },
  // 		{ sublabel: "Session Timeout", link: "/ui-sessiontimeout" },
  // 		{ sublabel: "Pagination", link: "/ui-pagination" },
  // 		{ sublabel: "Progress Bars", link: "/ui-progressbars" },
  // 		{ sublabel: "Placeholders", link: "/ui-placeholders" },
  // 		{ sublabel: "Tabs & Accordions", link: "/ui-tabs-accordions" },
  // 		{ sublabel: "Typography", link: "/ui-typography" },
  // 		{ sublabel: "Toasts", link: "/ui-toasts" },
  // 		{ sublabel: "Video", link: "/ui-video" },
  // 		{ sublabel: "Popovers & Tooltips", link: "/ui-popovers" },
  // 		{ sublabel: "Rating", link: "/ui-rating" },
  // 	],
  // },
  // {
  // 	label: "Forms",
  // 	icon: "ri-eraser-fill",
  // 	issubMenubadge: true,
  // 	bgcolor: "bg-danger",
  // 	badgeValue: "8",
  // 	subItem: [
  // 		{ sublabel: "Form Elements", link: "/form-elements" },
  // 		{ sublabel: "Form Validation", link: "/form-validation" },
  // 		{ sublabel: "Form Advanced Plugins", link: "/form-advanced" },
  // 		{ sublabel: "Form Editor", link: "/form-editor" },
  // 		{ sublabel: "Form File Upload", link: "/form-uploads" },
  // 		{ sublabel: "Form X-editable", link: "/form-editors" },
  // 		{ sublabel: "Form Wizard", link: "/form-wizard" },
  // 		{ sublabel: "Form Mask", link: "/form-mask" },
  // 	],
  // },

  // {
  // 	label: "Charts",
  // 	icon: "ri-bar-chart-line",
  // 	subItem: [
  // 		{ sublabel: "Apex Charts", link: "/chart-apexcharts" },
  // 		{ sublabel: "Chartjs Charts", link: "/chart-chartjscharts" },
  // 		{ sublabel: "Re Charts", link: "/chart-floatcharts" },
  // 		{ sublabel: "Knob Charts", link: "/chart-jknobcharts" },
  // 		{ sublabel: "Sparkline Charts", link: "/chart-sparklinecharts" },
  // 	],
  // },
  // {
  // 	label: "Icons",
  // 	icon: "ri-brush-line",
  // 	subItem: [
  // 		{ sublabel: "Box Icons", link: "/icon-boxicon" },
  // 		{ sublabel: "Material Design", link: "/icons-materialdesign" },
  // 		{ sublabel: "Dripicons", link: "/icon-dripicons" },
  // 		{ sublabel: "Font Awesome", link: "/icons-fontawesome" },
  // 	],
  // },
  // {
  // 	label: "Maps",
  // 	icon: "ri-map-pin-line",
  // 	subItem: [
  // 		{ sublabel: "Google Maps", link: "/maps-google" },
  // 		{ sublabel: "Vector Maps", link: "/maps-vector" },
  // 	],
  // },
  // {
  // 	label: "Multi Level",
  // 	icon: "ri-share-line",
  // 	subItem: [
  // 		{ sublabel: "Level 1.1", link: "/#" },
  // 		{
  // 			sublabel: "Level 1.2",
  // 			link: "/#",
  // 			subMenu: [{ title: "Level 2.1" }, { title: "Level 2.2" }],
  // 		},
  // 	],
  // },
];
export default SidebarData;
