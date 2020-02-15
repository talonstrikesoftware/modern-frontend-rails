#---
# Excerpted from "Modern Front-End Development for Rails",
# published by The Pragmatic Bookshelf.
# Copyrights apply to this code. It may not be used to create training material,
# courses, books, articles, and the like. Contact us if you are in doubt.
# We make no guarantees that this code is fit for any purpose.
# Visit http://www.pragmaticprogrammer.com/titles/nrclient for more book information.
#---
# == Schema Information
#
# Table name: tickets
#
#  id              :bigint           not null, primary key
#  concert_id      :bigint
#  row             :integer
#  number          :integer
#  user_id         :bigint
#  status          :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  ticket_order_id :bigint
#

class Ticket < ApplicationRecord
  belongs_to :concert
  belongs_to :user, optional: true
  belongs_to :ticket_order, optional: true

  enum status: %i[unsold held purchased refunded]
end
