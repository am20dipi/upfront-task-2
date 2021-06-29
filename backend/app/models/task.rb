class Task < ApplicationRecord
    belongs_to :category, optional: true

    validates :name, presence: true, length: {in: 1..40 }

    scope :most_recent, -> { order('created_at DESC') }
end
