class SendsmsMailer < ApplicationMailer
  def test_mailer(user_number, message)
    account_sid = ENV['ACCOUNT_SID']
    auth_token = ENV['AUTH_TOKEN']
    client = Twilio.connect(account_sid, auth_token)

    from = ENV['TWILIO_PHONE'] # Your Twilio number
    outbound_sms = Twilio::Sms.message(from, user_number, message) 
  end
end
