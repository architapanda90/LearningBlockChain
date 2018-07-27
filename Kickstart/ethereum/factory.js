import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x0A1034C534a727Faf2a4b036ab3742b95C828702'
);

export default instance;