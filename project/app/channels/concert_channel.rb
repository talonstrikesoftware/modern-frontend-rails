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
    result = Ticket.held_data_for_concert(data["concertId"])
    ActionCable.server.broadcast("concert_#{data["concertId"]}", result)
  end

  def removed_from_cart(data)
    workflow = ClearCart.new(concert_id: data["concertId"], tickets: data["tickets"])
    workflow.run
    result = Ticket.held_data_for_concert(data["concertId"])
    ActionCable.server.broadcast("concert_#{data["concertId"]}", result)
  end  
end