import React from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useAuth } from '../../context/AuthContext';
import { HiOutlineAcademicCap, HiOutlineClock, HiOutlineCheckCircle, HiOutlineXCircle, HiOutlineArrowPath, HiOutlineDocumentCheck, HiOutlineTrash } from 'react-icons/hi2';
import Card from '../ui/Card';
import Button from '../ui/Button';

const statusConfig = {
  draft: {
    label: 'Draft',
    color: 'bg-gray-100 text-gray-700',
    icon: HiOutlineClock,
    description: 'Application not yet submitted'
  },
  submitted: {
    label: 'Submitted',
    color: 'bg-blue-100 text-blue-700',
    icon: HiOutlineDocumentCheck,
    description: 'Application under review'
  },
  under_review: {
    label: 'Under Review',
    color: 'bg-yellow-100 text-yellow-700',
    icon: HiOutlineArrowPath,
    description: 'Being reviewed by admissions'
  },
  accepted: {
    label: 'Accepted',
    color: 'bg-green-100 text-green-700',
    icon: HiOutlineCheckCircle,
    description: 'Congratulations!'
  },
  rejected: {
    label: 'Rejected',
    color: 'bg-red-100 text-red-700',
    icon: HiOutlineXCircle,
    description: 'Application not successful'
  },
  withdrawn: {
    label: 'Withdrawn',
    color: 'bg-gray-100 text-gray-500',
    icon: HiOutlineTrash,
    description: 'Application withdrawn'
  }
};

const ApplicationTracker = () => {
  const { convexUserId } = useAuth();

  const applications = useQuery(
    api.applications.getUserApplicationsWithDetails,
    convexUserId ? { userId: convexUserId } : 'skip'
  );

  const updateStatus = useMutation(api.applications.updateApplicationStatus);
  const deleteApplication = useMutation(api.applications.deleteApplication);

  const handleSubmit = async (applicationId) => {
    try {
      await updateStatus({ applicationId, status: 'submitted' });
    } catch (error) {
      console.error('Failed to submit application:', error);
    }
  };

  const handleWithdraw = async (applicationId) => {
    try {
      await updateStatus({ applicationId, status: 'withdrawn' });
    } catch (error) {
      console.error('Failed to withdraw application:', error);
    }
  };

  const handleDelete = async (applicationId) => {
    try {
      await deleteApplication({ applicationId });
    } catch (error) {
      console.error('Failed to delete application:', error);
    }
  };

  if (!applications) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-primary-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <Card className="p-12 text-center">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">No Applications Yet</h3>
        <p className="text-gray-600 mb-4">
          Browse universities and express interest to start tracking your applications!
        </p>
      </Card>
    );
  }

  // Group applications by status
  const groupedApps = {
    active: applications.filter(app => ['draft', 'submitted', 'under_review'].includes(app.status)),
    decided: applications.filter(app => ['accepted', 'rejected'].includes(app.status)),
    withdrawn: applications.filter(app => app.status === 'withdrawn')
  };

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-primary-blue">{applications.length}</div>
          <div className="text-sm text-gray-600">Total Applications</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{groupedApps.active.length}</div>
          <div className="text-sm text-gray-600">Active</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-green-600">
            {applications.filter(a => a.status === 'accepted').length}
          </div>
          <div className="text-sm text-gray-600">Accepted</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-gray-600">
            {applications.filter(a => a.status === 'draft').length}
          </div>
          <div className="text-sm text-gray-600">Drafts</div>
        </Card>
      </div>

      {/* Active Applications */}
      {groupedApps.active.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <HiOutlineArrowPath className="text-primary-blue" size={20} />
            Active Applications
          </h3>
          <div className="space-y-4">
            {groupedApps.active.map((app) => {
              const status = statusConfig[app.status] || statusConfig.draft;
              const StatusIcon = status.icon;

              return (
                <Card key={app._id} className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">🎓</div>
                      <div>
                        <h4 className="font-bold text-gray-900">
                          {app.program?.name || 'Unknown Program'}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {app.university?.name || 'Unknown University'}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Applied: {new Date(app.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${status.color}`}>
                        <StatusIcon size={16} />
                        {status.label}
                      </span>

                      {app.status === 'draft' && (
                        <Button size="small" onClick={() => handleSubmit(app._id)}>
                          Submit
                        </Button>
                      )}

                      {['draft', 'submitted'].includes(app.status) && (
                        <Button
                          size="small"
                          variant="secondary"
                          onClick={() => handleWithdraw(app._id)}
                        >
                          Withdraw
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Decided Applications */}
      {groupedApps.decided.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <HiOutlineCheckCircle className="text-green-600" size={20} />
            Decisions Received
          </h3>
          <div className="space-y-4">
            {groupedApps.decided.map((app) => {
              const status = statusConfig[app.status] || statusConfig.draft;
              const StatusIcon = status.icon;

              return (
                <Card
                  key={app._id}
                  className={`p-4 ${app.status === 'accepted' ? 'border-2 border-green-200 bg-green-50' : ''}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">{app.status === 'accepted' ? '🎉' : '📝'}</div>
                      <div>
                        <h4 className="font-bold text-gray-900">
                          {app.program?.name || 'Unknown Program'}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {app.university?.name || 'Unknown University'}
                        </p>
                      </div>
                    </div>

                    <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${status.color}`}>
                      <StatusIcon size={16} />
                      {status.label}
                    </span>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Withdrawn Applications */}
      {groupedApps.withdrawn.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-gray-500 mb-4 flex items-center gap-2">
            <HiOutlineTrash size={20} />
            Withdrawn
          </h3>
          <div className="space-y-2">
            {groupedApps.withdrawn.map((app) => (
              <Card key={app._id} className="p-3 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-gray-600">
                      {app.program?.name} at {app.university?.name}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDelete(app._id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationTracker;
