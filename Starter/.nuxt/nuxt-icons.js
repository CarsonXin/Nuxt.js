export default async function (ctx, inject) {
  const moduleOptions = {"accessibleIcons":true,"iconProperty":"$icon","icons":{"64":"https:\u002F\u002Fvdoou-mmd.oss-cn-shenzhen.aliyuncs.com\u002Fbaotopv2\u002Fassets\u002Ficons\u002Ficon_64.9mld2VBMsQ$.png","120":"https:\u002F\u002Fvdoou-mmd.oss-cn-shenzhen.aliyuncs.com\u002Fbaotopv2\u002Fassets\u002Ficons\u002Ficon_120.9mld2VBMsQ$.png","144":"https:\u002F\u002Fvdoou-mmd.oss-cn-shenzhen.aliyuncs.com\u002Fbaotopv2\u002Fassets\u002Ficons\u002Ficon_144.9mld2VBMsQ$.png","152":"https:\u002F\u002Fvdoou-mmd.oss-cn-shenzhen.aliyuncs.com\u002Fbaotopv2\u002Fassets\u002Ficons\u002Ficon_152.9mld2VBMsQ$.png","192":"https:\u002F\u002Fvdoou-mmd.oss-cn-shenzhen.aliyuncs.com\u002Fbaotopv2\u002Fassets\u002Ficons\u002Ficon_192.9mld2VBMsQ$.png","384":"https:\u002F\u002Fvdoou-mmd.oss-cn-shenzhen.aliyuncs.com\u002Fbaotopv2\u002Fassets\u002Ficons\u002Ficon_384.9mld2VBMsQ$.png","512":"https:\u002F\u002Fvdoou-mmd.oss-cn-shenzhen.aliyuncs.com\u002Fbaotopv2\u002Fassets\u002Ficons\u002Ficon_512.9mld2VBMsQ$.png"}}
  inject(moduleOptions.iconProperty.replace('$', ''), retrieveIcons(moduleOptions.icons))
}

const retrieveIcons = icons => size => icons[size] || ''
