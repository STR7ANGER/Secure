module.exports = {
  google: {
    API_KEY: "",
    CLIENT_ID: "23144678283-oek7ncjmmrgkgmi2i56sc411gp71a8sp.apps.googleusercontent.com",
    SECRET: "",
  },
  facebook: {
    APP_ID: "",
  },
  azure: {
    clientId: process.env.REACT_APP_AZURE_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.REACT_APP_AZURE_TENENT_ID}`,
    redirectUri: `${process.env.REACT_APP_AZURE_REDIRECT_URI}`
  }
}
