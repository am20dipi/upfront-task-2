class CompletedTaskSerializer
  include JSONAPI::Serializer
  attributes :completed, :tasks
  has_many :tasks
end
