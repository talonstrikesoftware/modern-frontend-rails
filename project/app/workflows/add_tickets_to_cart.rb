class AddTicketsToCart
  attr_reader :concert_id, :row, :seat_number, :tickets_to_buy, :status

  def initialize(concert_id:, row:, seat_number:, tickets_to_buy:, status:)
    @concert_id = concert_id
    @row = row
    @seat_number = seat_number
    @tickets_to_buy = tickets_to_buy
    @status = status
  end

  def seat_range
    seat_number ... seat_number + tickets_to_buy
  end

  def tickets
    @tickets ||= Ticket.where(concert_id: concert_id, row: row, number: seat_range).all
  end

  def run
    tickets.update(status: status)
  end
end