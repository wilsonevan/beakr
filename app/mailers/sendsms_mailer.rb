class SendsmsMailer < ApplicationMailer
  def test_mailer(user_number, message)
    account_sid = 'ACfb2a137c375c75c9e2e1c06f273feb3a'
    auth_token = '643ede188c63d4f4ed30a9034a54ee1a'
    client = Twilio.connect(account_sid, auth_token)

    from = '+13858812480' # Your Twilio number
    Twilio::Sms.message(from, user_number, message) 
  end
end
