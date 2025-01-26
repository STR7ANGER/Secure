import React, { useState } from "react";

const Navdata = () => {
  const [ui, setui] = useState(false);
  const [app, setapp] = useState(false);
  const [email, setemail] = useState(false);
  const [component, setcomponent] = useState(false);
  const [form, setform] = useState(false);
  const [table, settable] = useState(false);
  const [chart, setchart] = useState(false);
  const [icon, seticon] = useState(false);
  const [map, setmap] = useState(false);
  const [pages, setpages] = useState(false);
  const [auth, setauth] = useState(false);
  const [utility, setutility] = useState(false);

  const NavnavData = [
    {
      id: 1,
      label: "Dashboard",
      icon: "mdi mdi-home-variant-outline me-2",
      isdropDown: true,
      click: function () {
        setui(false);
        setapp(false);
        setcomponent(false);
        setpages(false);
      },
    },
    {
      id: 2,
      label: "UI Elements",
      icon: "mdi mdi-briefcase-variant-outline me-2",
      click: function () {
        setui(!ui);
        setapp(false);
        setcomponent(false);
        setpages(false);
      },
      currentState: ui,
      subItem: [
        { link: "/ui-alerts", title: "Alerts" },
        { link: "/ui-badge", title: "Badge" },
        { link: "/ui-breadcrumb", title: "Breadcrumb" },
        { link: "/ui-buttons", title: "Buttons" },
        { link: "/ui-cards", title: "Cards" },
        { link: "/ui-carousel", title: "Carousel" },
        { link: "/ui-dropdowns", title: "Dropdowns" },
        { link: "/ui-grid", title: "Grid" },
        { link: "/ui-images", title: "Images" },
        { link: "/ui-lightbox", title: "Lightbox" },
        { link: "/ui-modals", title: "Modals" },
        { link: "/ui-offcanvas", title: "Offcanvas" },
        { link: "/ui-rangeslider", title: "Range Slider" },
        { link: "/ui-sessiontimeout", title: "Session Timeout" },
        { link: "/ui-pagination", title: "Pagination" },
        { link: "/ui-placeholders", title: "Placeholders" },
        { link: "/ui-progressbars", title: "Progress Bars" },
        { link: "/ui-tabs-accordions", title: "Tabs & Accordions" },
        { link: "/ui-typography", title: "Typography" },
        { link: "/ui-toasts", title: "Toasts" },
        { link: "/ui-video", title: "Video" },
        { link: "/ui-popovers", title: "Popovers & Tooltips" },
        { link: "/ui-rating", title: "Rating" },
      ],
    },
    {
      id: 3,
      label: "Apps",
      icon: "ri-apps-2-line me-2",
      click: function () {
        setapp(!app);
        setui(false);
        setcomponent(false);
        setpages(false);
        setemail(false);
      },

      currentState: app,
      subItems: [
        {
          label2: "Calendar",
          url: "/calendar",
        },
        {
          label2: "Email",

          staclick: function () {
            setemail(!email);

            setui(false);
            setcomponent(false);
            setpages(false);
          },

          subState: email,
          subItem: [
            { link: "/inbox", title: "Inbox" },
            { link: "/read-email", title: "Read Email" },
            { link: "/compose-email", title: "Compose Email" },
          ],
        },
      ],
    },
    {
      id: 4,
      label: "Components",
      icon: "ri-stack-line me-2",
      click: function () {
        setcomponent(!component);
        setui(false);
        setapp(false);
        setpages(false);
        setmap(false);
        setform(false);
        settable(false);
        setchart(false);
        seticon(false);
      },
      currentState: component,
      subItems: [
        {
          label2: "Forms",
          staclick: function () {
            setform(!form);
            settable(false);
            setchart(false);
            seticon(false);
            setmap(false);

            setui(false);
            setapp(false);
            setpages(false);
          },
          subState: form,
          subItem: [
            { link: "/form-elements", title: "Elements" },
            { link: "/form-validation", title: "Validation" },
            { link: "/form-advanced", title: "Advanced Plugins" },
            { link: "/form-editor", title: "Editors" },
            { link: "/form-uploads", title: "File Upload" },
            { link: "/form-editors", title: "Xeditable" },
            { link: "/form-wizard", title: "Wizard" },
            { link: "/form-mask", title: "Mask" },
          ],
        },

        {
          label2: "Tables",
          staclick: function () {
            settable(!table);
            setform(false);
            setchart(false);
            seticon(false);
            setmap(false);

            setui(false);
            setapp(false);
            setpages(false);
          },
          subState: table,
          subItem: [
            { link: "/tables-basic", title: "Basic Tables" },
            { link: "/table-datatable", title: "Data Tables" },
            { link: "/tables-advanced", title: "Responsive Table" },
            { link: "/table-editable", title: "Editable Table" },
          ],
        },

        {
          label2: "Charts",
          staclick: function () {
            setchart(!chart);
            setform(false);
            settable(false);
            seticon(false);
            setmap(false);

            setui(false);
            setapp(false);
            setpages(false);
          },
          subState: chart,
          subItem: [
            { link: "/chart-apexcharts", title: "Apex Charts" },
            { link: "/chart-chartjscharts", title: "Chartjs" },
            { link: "/chart-floatcharts", title: "RE Charts" },
            { link: "/chart-jknobcharts", title: "Knob Charts" },
            { link: "/chart-sparklinecharts", title: "Sparkline Charts" },
          ],
        },

        {
          label2: "Icons",
          staclick: function () {
            seticon(!icon);

            setform(false);
            settable(false);
            setchart(false);
            setmap(false);

            setui(false);
            setapp(false);
            setpages(false);
          },
          subState: icon,
          subItem: [
            { link: "/icon-boxicon", title: "BoxIcons" },
            { link: "/icons-materialdesign", title: "Material Design" },
            { link: "/icon-dripicons", title: "Dripicons" },
            { link: "/icons-fontawesome", title: "Font Awesome" },
          ],
        },

        {
          label2: "Maps",
          staclick: function () {
            setmap(!map);
            setform(false);
            settable(false);
            setchart(false);
            seticon(false);

            setui(false);
            setapp(false);
            setpages(false);
          },
          subState: map,
          subItem: [
            { link: "/maps-google", title: "Google Maps" },
            { link: "/maps-vector", title: "Vector Maps" },
          ],
        },
      ],
    },
    {
      id: 5,
      label: "Pages",
      icon: "ri-file-copy-2-line me-2",
      click: function () {
        setpages(!pages);
        setui(false);
        setapp(false);
        setcomponent(false);

        setutility(false);
        setauth(false);
      },
      currentState: pages,
      subItems: [
        {
          label2: "Authentication",

          staclick: function () {
            setauth(!auth);
            setutility(false);

            setui(false);
            setapp(false);
            setcomponent(false);
          },
          subState: auth,
          subItem: [
            { link: "/auth-login", title: "Login" },
            { link: "/auth-register", title: "Register" },
            { link: "/auth-recoverpw", title: "Recover Password" },
            { link: "/auth-lock-screen", title: "Lock Screen" },
          ],
        },
        {
          label2: "Utility",
          staclick: function () {
            setutility(!utility);
            setauth(false);

            setui(false);
            setapp(false);
            setcomponent(false);
          },
          subState: utility,
          subItem: [
            { link: "/pages-starter", title: "Starter Page" },
            { link: "/pages-maintenance", title: "Maintenance" },
            { link: "/pages-comingsoon", title: "Coming Soon" },
            { link: "/pages-timeline", title: "Timeline" },
            { link: "/pages-faqs", title: "FAQs" },
            { link: "/pages-pricing", title: "Pricing" },
            { link: "/pages-404", title: "Error 404" },
            { link: "/pages-500", title: "Error 500" },
          ],
        },
      ],
    },
  ];
  return <React.Fragment>{NavnavData}</React.Fragment>;
};

export default Navdata;
