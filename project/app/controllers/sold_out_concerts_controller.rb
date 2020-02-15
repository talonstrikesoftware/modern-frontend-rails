class SoldOutConcertsController < ApplicationController
  def show
    concerts = Concert.includes(:venue, gigs: :band).all
    sold_out_concert_ids = concerts.select(&:sold_out?).map(&:id)
      render(json: {sold_out_concert_ids: sold_out_concert_ids})
    end
  end

