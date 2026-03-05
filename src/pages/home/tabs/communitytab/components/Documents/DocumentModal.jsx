import React from 'react';
import { X, FileText, Printer, Share2, Trash2, Clock, ShieldCheck } from 'lucide-react';
import './Documents.css';

export const DocumentModal = ({ document, documentHistory, onClose, onDelete, onShare, onPrint }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{document.name}</h3>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="document-preview">
            <FileText size={64} />
            <p>Document Preview</p>
          </div>

          <div className="document-details">
            <h4>Document Details</h4>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="label">Type:</span>
                <span>{document.type}</span>
              </div>
              <div className="detail-item">
                <span className="label">Status:</span>
                <span className={`status-badge ${document.status}`}>
                  {document.status}
                </span>
              </div>
              <div className="detail-item">
                <span className="label">Uploaded:</span>
                <span>{document.date}</span>
              </div>
              <div className="detail-item">
                <span className="label">Size:</span>
                <span>{document.size}</span>
              </div>
              <div className="detail-item">
                <span className="label">Points:</span>
                <span className="points">+{document.points}</span>
              </div>
              <div className="detail-item">
                <span className="label">Hash:</span>
                <span className="hash">{document.hash}</span>
              </div>
            </div>

            {document.ocrText && (
              <div className="ocr-text">
                <h4>Extracted Text</h4>
                <p>{document.ocrText}</p>
              </div>
            )}

            <div className="version-history">
              <h4>Version History</h4>
              {documentHistory
                .filter(h => h.docId === document.id)
                .map((history, index) => (
                  <div key={index} className="history-item">
                    <span className="version">v{history.version}</span>
                    <span className="date">{history.date}</span>
                    <span className="action">{history.action}</span>
                    <span className="user">{history.user}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={onPrint}>
            <Printer size={16} />
            Print
          </button>
          <button onClick={() => onShare(document)}>
            <Share2 size={16} />
            Share
          </button>
          <button onClick={() => onDelete(document.id)} className="danger">
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};