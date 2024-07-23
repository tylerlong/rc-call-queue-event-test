import RingCentral from '@rc-ex/core';
import WebSocketExtension from '@rc-ex/ws';

const rc = new RingCentral({
  server: process.env.RINGCENTRAL_SERVER_URL,
  clientId: process.env.RINGCENTRAL_CLIENT_ID,
  clientSecret: process.env.RINGCENTRAL_CLIENT_SECRET,
});

const main = async () => {
  await rc.authorize({
    jwt: process.env.RINGCENTRAL_JWT_TOKEN!,
  });

  const wsExt = new WebSocketExtension();
  await rc.installExtension(wsExt);
  // subsribe to the call queue extension
  const sub = await wsExt.subscribe(['/restapi/v1.0/account/~/extension/62282928016/telephony/sessions'], (event) => {
    console.log(JSON.stringify(event, null, 2));
  });
  console.log(JSON.stringify(sub.subscriptionInfo, null, 2));
};
main();
