#---
# Excerpted from "Modern Front-End Development for Rails",
# published by The Pragmatic Bookshelf.
# Copyrights apply to this code. It may not be used to create training material,
# courses, books, articles, and the like. Contact us if you are in doubt.
# We make no guarantees that this code is fit for any purpose.
# Visit http://www.pragmaticprogrammer.com/titles/nrclient for more book information.
#---
class Schedule
  attr_accessor :schedule_days

  def self.from_concerts(all_concerts)
    schedule = Schedule.new
    all_concerts.group_by(&:start_day).each do |day, concerts|
      schedule.schedule_days << ScheduleDay.new(day, concerts)
      schedule.schedule_days.sort_by!(&:day)
    end
    schedule
  end

  def initialize
    @schedule_days = []
  end
end
