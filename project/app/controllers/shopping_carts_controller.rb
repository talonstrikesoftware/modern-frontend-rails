#---
# Excerpted from "Modern Front-End Development for Rails",
# published by The Pragmatic Bookshelf.
# Copyrights apply to this code. It may not be used to create training material,
# courses, books, articles, and the like. Contact us if you are in doubt.
# We make no guarantees that this code is fit for any purpose.
# Visit http://www.pragmaticprogrammer.com/titles/nrclient for more book information.
#---
class ShoppingCartsController < ApplicationController

  def create
    tickets = Ticket.where(
        concert_id: params[:concertId],
        row: params[:row],
        number: params[:seatNumber] ... params[:seatNumber] + params[:ticketsToBuy]).all
    tickets.update(status: params[:status])
    render(json: tickets.map(&:to_concert_h))
  end

end
