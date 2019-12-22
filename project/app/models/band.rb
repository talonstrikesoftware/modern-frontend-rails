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
# Table name: bands
#
#  id          :bigint           not null, primary key
#  name        :string
#  description :text
#  genre_tags  :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Band < ApplicationRecord
  has_many :gigs, dependent: :destroy
  has_many :concerts, through: :gigs

  def genres
    genre_tags.split(",")
  end
end
