import { Sparkles } from '../../utils/icons';
import './UpgradeBtn.scss';

const UpgradeBtn = () => {

  const onUpgrade = (e) => {
    e.preventDefault();

    // eslint-disable-next-line no-undef
    const checkoutConfig = new FS.Checkout({
      product_id: '17342',
      plan_id: '28900',
      public_key: 'pk_624005a9d0c56ff46db6602f5f730',
      image: 'https://ibb.co.com/tBpcmwC'
    });

    checkoutConfig.open({
      title: 'Timeline Block Pro',
      licenses: 1,
      // You can consume the response for after purchase logic.
      // eslint-disable-next-line no-unused-vars
      purchaseCompleted: (res) => {
        // The logic here will be executed immediately after the purchase confirmation.
        // alert(response.user.email);
      },
      // eslint-disable-next-line no-unused-vars
      success: (res) => {
        // The logic here will be executed after the customer closes the checkout, after a successful purchase.
        // alert(response.user.email);
      }
    });
    e.preventDefault();
  }

  return <button onClick={onUpgrade} className='premium-button'>
    <span className="button-background"></span>
    <span className="button-shine"></span>
    <span className="button-overlay"></span>
    <span className="button-glow"></span>
    <span className="button-content">
      <Sparkles className="sparkle-icon" />
      Upgrade to Pro
    </span>
  </button>
}

export default UpgradeBtn;