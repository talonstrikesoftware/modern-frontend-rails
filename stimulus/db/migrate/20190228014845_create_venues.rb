#---
# Excerpted from "Modern Front-End Development for Rails",
# published by The Pragmatic Bookshelf.
# Copyrights apply to this code. It may not be used to create training material,
# courses, books, articles, and the like. Contact us if you are in doubt.
# We make no guarantees that this code is fit for any purpose.
# Visit http://www.pragmaticprogrammer.com/titles/nrclient for more book information.
#---
class CreateVenues < ActiveRecord::Migration[6.0]
  def change
    create_table :venues do |t|
      t.string :name
      t.text :description
      t.integer :rows
      t.integer :seats_per_row

      t.timestamps
    end
  end
end
