from datetime import datetime, date, timedelta
import calendar

#  print(calendar.day_name[0]) #  Monday
#  print(calendar.day_name[1]) #  Tuesday
#  print(calendar.day_name[2]) #  Wednesday
#  print(calendar.day_name[3]) #  Thursday
#  print(calendar.day_name[4]) #  Friday
#  print(calendar.day_name[5]) #  Saturday
#  print(calendar.day_name[6]) #  Sunday


def deadline_in_business_days(dateStart, daysToAdd: int, weekDaysToIgnore):
    while daysToAdd > 0:
        dateStart += timedelta(days=1)
        if(dateStart.weekday() not in weekDaysToIgnore):
            daysToAdd = daysToAdd - 1
    return dateStart
