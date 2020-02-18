class ConcertChannel < ApplicationCable::Channel
  def subscribed
    stream_from("concert_#{params[:concertId]}")
  end

  def unsubscribed
  end

  def added_to_cart(data)
    workflow = AddTicketsToCart.new(
      concert_id: data["concertId"],
      row: data["row"],
      seat_number: data["seatNumber"],
      tickets_to_buy: data["ticketsToBuy"],
      status: data["status"]
    )

    workflow.run
    result = Ticket.grouped_for_concert(data["concertId"])
    ActionCable.server.boradcast("concert_#{data["concertId"]}", result)
  end
end