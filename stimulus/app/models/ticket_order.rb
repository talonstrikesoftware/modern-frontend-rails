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
# Table name: ticket_orders
#
#  id               :bigint           not null, primary key
#  concert_id       :bigint
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  status           :integer          default(0)
#  count            :integer          default(0)
#  shopping_cart_id :integer
#

class TicketOrder < ApplicationRecord
  belongs_to :concert
  belongs_to :shopping_cart
  has_many :tickets
end
