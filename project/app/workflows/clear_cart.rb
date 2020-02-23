class ClearCart
  atr_accessor :concert_id, :tickets

  def initialize(concert_id:, tickets:)
    @concert_id = concert_id
    @tickets = tickets
  end

  def run
    tickets.each do |ticket|
      db_ticket = Ticket.find_by(row: ticket["row"], number: ticket["number"], concert_id: concert_id)
      db_ticket&.update(status: :unsold)
    end
  end
end  