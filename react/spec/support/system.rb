#---
# Excerpted from "Modern Front-End Development for Rails",
# published by The Pragmatic Bookshelf.
# Copyrights apply to this code. It may not be used to create training material,
# courses, books, articles, and the like. Contact us if you are in doubt.
# We make no guarantees that this code is fit for any purpose.
# Visit http://www.pragmaticprogrammer.com/titles/nrclient for more book information.
#---
require "capybara/rspec"
require "selenium/webdriver"

RSpec.configure do |config|
  config.before(:each, type: :system) do
    driven_by :rack_test
  end

  config.before(:each, type: :system, js: true) do
    if ENV["SELENIUM_DRIVER_URL"].present?
      driven_by(:selenium, using: :chrome,
                           options: {
                             browser: :remote,
                             url: ENV.fetch("SELENIUM_DRIVER_URL"),
                             desired_capabilities: :chrome})
      Capybara.default_max_wait_time = 10
    else
      driven_by(:selenium_chrome_headless)
    end
  end

  config.after(:all) do
    FileUtils.rm_rf(Rails.root.join("tmp", "storage"))
  end
end
