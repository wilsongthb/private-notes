from rest_framework import routers
from notes import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)
#  router.register(r'entities', views.EntityViewSet)
router.register(r'contacts', views.ContactViewSet)
router.register(r'programs', views.ProgramViewSet)
router.register(r'program-activities', views.ProgramActivityViewSet)
router.register(r'notes', views.NoteViewSet)
#  router.register(r'note-payments', views.NotePaymentViewSet)
router.register(r'payments', views.PaymentViewSet)
router.register(r'annotations', views.AnnotationViewSet)
#  router.register(r'note-activities', views.NoteActivityViewSet)

