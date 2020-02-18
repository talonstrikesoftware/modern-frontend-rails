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

  def self.for_concert(concert_id)
    return Ticket.all unless concert_id
    Ticket.where(concert_id: concert_id)
      .order(row: :asc, number: :asc)
      .all
      .reject(&:refunded?)
  end

  def self.grouped_for_concert(concert_id)
    return [] unless concert_id
    for_concert(concert_id).map(&:to_concert_h).group_by { |t| t[:row]}.values
  end
  
  def to_concert_h
    {id: id, row: row, number: number, status: status}
  end
end
