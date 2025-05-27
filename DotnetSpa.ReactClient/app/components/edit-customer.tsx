import React, { useRef, useState, useEffect } from 'react';
import type { Customer } from '../models/customer';
import styles from './EditCustomer.scss'

type Props = {
  customer: Customer;
  onUpdate: (updated: Customer) => void;
  onDelete: (id: number) => void;
  onCancel: () => void;
};

export default function EditCustomerDialog({ customer, onUpdate, onDelete, onCancel }: Props) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [formCustomer, setFormCustomer] = useState<Customer>({ ...customer });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormCustomer({ ...customer });
  }, [customer]);

  const show = () => {
    dialogRef.current?.showModal();
  };

  const hide = () => {
    if (loading) return;
    dialogRef.current?.close();
    onCancel();
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      onUpdate({ ...formCustomer });
      setLoading(false);
      hide();
    } catch {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      onDelete(formCustomer.id);
      setLoading(false);
      hide();
    } catch {
      setLoading(false);
    }
  };

  const handleCancel = (e: React.SyntheticEvent) => {
    e.preventDefault();
    hide();
  };

  const handleClose = () => {
    onCancel();
  };

  const updateField = (field: keyof Customer, value: string) => {
    setFormCustomer(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <button onClick={(e) => { e.stopPropagation(); show(); }}>
        <i className="fas fa-user-edit"></i>
      </button>

      <dialog
        ref={dialogRef}
        role="dialog"
        className={styles.dialog}
        aria-modal="true"
        aria-labelledby="dialog-title"
        onCancel={handleCancel}
        onClose={handleClose}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        <form method="dialog" onSubmit={(e) => { e.preventDefault(); handleSave(); }} onMouseDown={(e) => e.stopPropagation()}>
          <header>
            <h3 id="dialog-title">Edit Customer</h3>
            <button type="button" onClick={(e) => { e.stopPropagation(); hide(); }} disabled={loading} className="close-button">
              <i className="fas fa-times"></i>
            </button>
          </header>

          <div className="form-content">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                value={formCustomer.firstName}
                onChange={(e) => updateField('firstName', e.target.value)}
                placeholder="First Name"
                disabled={loading}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                value={formCustomer.lastName}
                onChange={(e) => updateField('lastName', e.target.value)}
                placeholder="Last Name"
                disabled={loading}
                required
              />
            </div>
          </div>

          <footer>
            <button type="button" className="delete-button" onClick={handleDelete} disabled={loading}>
              Delete
            </button>
            <div className="action-buttons">
              <button type="submit" className="save-button" disabled={loading}>Save</button>
              <button type="button" className="cancel-button" onClick={() => hide()} disabled={loading}>
                Cancel
              </button>
            </div>
          </footer>
        </form>
      </dialog>
    </>
  );
}
