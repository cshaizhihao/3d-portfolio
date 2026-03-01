import Lead from '../models/Lead.js';
import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';

export const createLead = async (req, res, next) => {
  try {
    const { name, email, budget, message, source } = req.body;

    if (!name || !email || !message) {
      return errorResponse(res, 400, 'name, email, message are required');
    }

    const lead = await Lead.create({ name, email, budget, message, source: source || 'website' });
    successResponse(res, 201, 'Lead submitted successfully', lead);
  } catch (error) {
    next(error);
  }
};

export const getLeads = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const query = {};
    if (status) query.status = status;

    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const total = await Lead.countDocuments(query);

    const leads = await Lead.find(query)
      .sort('-createdAt')
      .skip(skip)
      .limit(parseInt(limit, 10))
      .lean();

    paginatedResponse(res, 200, 'Leads fetched successfully', leads, {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      total,
    });
  } catch (error) {
    next(error);
  }
};

export const updateLeadStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const allowed = ['new', 'contacted', 'won', 'lost'];
    if (!allowed.includes(status)) {
      return errorResponse(res, 400, 'Invalid status');
    }

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!lead) {
      return errorResponse(res, 404, 'Lead not found');
    }

    successResponse(res, 200, 'Lead status updated', lead);
  } catch (error) {
    next(error);
  }
};
