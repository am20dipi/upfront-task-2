class TaskSerializer
  include JSONAPI::Serializer
  attributes :id, :name, :category_id, :completed
  belongs_to :category
end
