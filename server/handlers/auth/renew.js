const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.AWS_REGION_NAME });
const CognitoIdentityServiceProvider = AWS.CognitoIdentityServiceProvider;
const client = new CognitoIdentityServiceProvider({ apiVersion: '2016-04-19' });
const genericParams = {
  UserPoolId: process.env.COGNITO_POOL_ID
}

const renew = function({
  RefreshToken,
}) {
  const params = {
    ...genericParams,
    AuthFlow: "REFRESH_TOKEN_AUTH",
    ClientId: process.env.COGNITO_POOL_CLIENT_ID,
    AuthParameters: {
      "REFRESH_TOKEN": 'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.AXcDMZaBojxNy5KKynbKnZ53xgkSi2In9e9bACvE-iT2VdvFYaosena4fWEJ0DCWm507HwDu9UG2tdb_RmGIvL89VWJ_9zNe7zYfqBBtwypT8PkX241hCelXxAHB1El7bnV2wh1w6I3njyPOjVTyWUWgd_0herZB_TzBVMXA8TGDec66TBwGvrMcKImgdscZLnaE8-3ZbwnTiB6I8FeRdvWZSOGRV4xRGyM9rQdyFnKK3Pe03AJ87gR90cq8WA51DnPr-BgYDSVbGZv6Uj7spVJy7DJZzsHcXmi5UFUBPPLVbRkgynHUcwsux44sPDYcw3InIG9O76tgYJW2EgKiaQ.Rw55cmgY3nP-nL9d.6Lmv_DP-syhwwy86lJOYiOJoYhvX1bvwwLI0c8BgH2dvWUHwaqdc8HnGQIX_5BcOUceKL7jdSl4gt6OpjAdy3qXs6U7lxmY0G0HjhRObOZWyeUewYJIqe0U9rIIpoPAglTqXkAfPsjZ3s6DUF8GNeV28mu5A1NY9MLq-lCuyeEzpMzRHkAiQ2hGnSftxSbCCTUgdB-SuASnR2har61yx0sj6HJb2tSDC67s9yNGIFYjkeTAlljZ_P_GDDCddaKRDQ466gSwjk7zGJ4WZr8RqPkUP3CBum98KbapCsNJ5JSAnLzNwWNjep6_tdmIeeoDHqBW_mXaA9K8Wo2KH-fxFpkdmuckoq2C6VzFyfJxb3bNZIi6mefuVwbKJU_5zD3bIzrn9NYRypa7AwU-ljNXpkKvg2M2z7cHD8IfZHRcOf-kxa6-RMSzTZ3wyDeyYBc__zbw6S3XBtEommWg2ggh8NZmm_w7uB7VUFHvFS9oCXWtF-X-sKWrpvYxXiDc10rNFmWtq0crTW_ilf-aPapeJ8OS-pbypPf9t4xXUMHlcM_bYheZ6iVyH8ZJV420S4cmtcVSsbf6s0HSzHvIg2lNBQVIFmR7uRpxsL2PUCCJwUMQt9CEIsw4_rayDsOrYXIDtST1fTXMRimLMU2HXwU1IbW2YtLbWWwnn5kLep-rvX5ycocBmo_HYLYKvMyuB9HhQgnRZ7POMXIhF-lQe0OTxaXPAxfDXmasYnllNVqipOP0eRn4ajAzNkLPerZ8dJANiPGGBgIXjVPS8yAsBHwLwEDmHPEcDGeN_F1P5SUAjS10xMMa-OacO7Vuftj7ocy9sRlM7jMi4mgSql5OZRuGZI_bwItiDS0cJtxSCdLuPXl9iXdGlplGAbse5VWQNX5_ApVIdPuZGvaw9EJQQQYA_exfiJPearYAzNXxRkxEMj7ogPJzsdB5l8urkbxfr7Hxz58ogdBxxlUYnftGv5tbIWFcmWOWqhF7yEjgD2Q9u__od6sQKoERa7g8F9Xp95aommoyLfTvH2F25HQL8PI0_XpcyhJ1AVlysgvMd72vjHEhtvJz7MQ2zHDehbCCe57TYJJKM8tuR6NXRo5WjGfJn8psiHDoQHZym0Qg1IJBYbHLzjvpRQPhEaCvEaVjuzcaeQtpdjQUsJ0tpIC8pe85p7DQZv-P95c5rYv92MJY6BugRAtAwCXyLUdAohjkMCPKqWAMi9O76mnNCTiSn1DT01cagl0Ngu4ZrEuwY5-FlZenowiknypxhhfZdGtJrbq09Fsz-DEJIU9Hk8lr2G4ddtviuYgM9y6p98VDTfBfgvlbwV0elcs5tea2VLSfWIUoHGnA0h_t28a0qEJCzTJdaxdQs5V0-vpEHYN3ED9CahtGDJw_AR-sGZ5BeWo3xS3GXVsD36tLJZm7F_zZgKIpR1fDDLiyZ2cc09ITGEB9r.H8muxb0U2BdF4GVPpiicIg'
    }
  }
  return new Promise((resolve, reject) => {
    client.adminInitiateAuth(params, function(err, data) {
      if (err) {
        console.log(err.message);
        reject(err);
        return;
      }
      resolve(data)
    })
  })
}

module.exports = async event => {
  const renewResult = await renew(event)
  return renewResult
};