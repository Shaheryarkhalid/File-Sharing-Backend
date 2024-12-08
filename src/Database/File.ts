import mongoose, { Schema, Document } from 'mongoose';

interface IFile extends Document {
	name: string;
	shared: boolean;
	uploadedBy: mongoose.Schema.Types.ObjectId;
	views: number;
	meta: {
	  createdAt: Date;
	  updatedAt: Date;
	};
}
const fileSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    shared: {
      type: Boolean,
      default: false
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      required: true
    },
	views: {
		type: Number,
		default: 0
	},
    meta: {
      createdAt: {
        type: Date,
        default: Date.now
      },
      updatedAt: {
        type: Date,
        default: Date.now
      }
    }
  },
  {
    timestamps: false
  }
);

fileSchema.pre<IFile>('save', function (next) {
  this.meta.updatedAt = new Date(Date.now());
  next();
});

const File = mongoose.model<IFile>('File', fileSchema);

export default File;
